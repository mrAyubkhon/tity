const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Media = require('../models/Media');
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webm/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed!'));
    }
  }
});

// Upload single media file
router.post('/upload', upload.single('media'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title, description, category, tags, metadata } = req.body;
    
    // Determine file type
    const isVideo = req.file.mimetype.startsWith('video/');
    const type = isVideo ? 'video' : 'photo';

    // Upload to Cloudinary
    const uploadOptions = {
      resource_type: isVideo ? 'video' : 'image',
      folder: `titu-luxury/${type}s`,
      quality: 'auto',
      fetch_format: 'auto'
    };

    const result = await cloudinary.uploader.upload_stream(
      uploadOptions,
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ error: 'Upload failed' });
        }

        try {
          // Create media document
          const media = new Media({
            title,
            description,
            type,
            category,
            url: result.secure_url,
            thumbnail: isVideo ? result.thumbnail_url : result.secure_url,
            cloudinaryId: result.public_id,
            size: req.file.size,
            dimensions: {
              width: result.width,
              height: result.height
            },
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            metadata: metadata ? JSON.parse(metadata) : {}
          });

          await media.save();
          res.status(201).json({
            message: 'Media uploaded successfully',
            media: media
          });
        } catch (dbError) {
          console.error('Database error:', dbError);
          res.status(500).json({ error: 'Failed to save media to database' });
        }
      }
    );

    // Send file buffer to Cloudinary
    cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ error: 'Upload failed' });
      }

      // Create media document
      const media = new Media({
        title,
        description,
        type,
        category,
        url: result.secure_url,
        thumbnail: isVideo ? result.thumbnail_url : result.secure_url,
        cloudinaryId: result.public_id,
        size: req.file.size,
        dimensions: {
          width: result.width,
          height: result.height
        },
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        metadata: metadata ? JSON.parse(metadata) : {}
      });

      media.save()
        .then(savedMedia => {
          res.status(201).json({
            message: 'Media uploaded successfully',
            media: savedMedia
          });
        })
        .catch(dbError => {
          console.error('Database error:', dbError);
          res.status(500).json({ error: 'Failed to save media to database' });
        });
    }).end(req.file.buffer);

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get all media with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      type,
      category,
      featured,
      search
    } = req.query;

    const query = { isActive: true };

    if (type) query.type = type;
    if (category) query.category = category;
    if (featured === 'true') query.isFeatured = true;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const media = await Media.find(query)
      .sort({ uploadDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Media.countDocuments(query);

    res.json({
      media,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get media error:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

// Get single media by ID
router.get('/:id', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }
    res.json(media);
  } catch (error) {
    console.error('Get media error:', error);
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

// Update media
router.put('/:id', async (req, res) => {
  try {
    const { title, description, category, tags, isFeatured, metadata } = req.body;
    
    const media = await Media.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        isFeatured,
        metadata: metadata ? JSON.parse(metadata) : {}
      },
      { new: true }
    );

    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    res.json({
      message: 'Media updated successfully',
      media
    });
  } catch (error) {
    console.error('Update media error:', error);
    res.status(500).json({ error: 'Failed to update media' });
  }
});

// Delete media
router.delete('/:id', async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ error: 'Media not found' });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(media.cloudinaryId, {
      resource_type: media.type === 'video' ? 'video' : 'image'
    });

    // Soft delete from database
    media.isActive = false;
    await media.save();

    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Delete media error:', error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
});

module.exports = router;
