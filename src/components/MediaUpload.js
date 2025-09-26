import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { mediaAPI } from '../services/api';
import toast from 'react-hot-toast';

const MediaUpload = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Portrait',
    tags: '',
    metadata: ''
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setUploading(true);
    setUploadProgress(0);

    try {
      // Create FormData
      const uploadFormData = new FormData();
      uploadFormData.append('media', file);
      uploadFormData.append('title', formData.title || file.name);
      uploadFormData.append('description', formData.description);
      uploadFormData.append('category', formData.category);
      uploadFormData.append('tags', formData.tags);
      uploadFormData.append('metadata', formData.metadata);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await mediaAPI.uploadMedia(uploadFormData);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      toast.success('Media uploaded successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'Portrait',
        tags: '',
        metadata: ''
      });

      if (onUploadSuccess) {
        onUploadSuccess(response.media);
      }

      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload media. Please try again.');
      setUploading(false);
      setUploadProgress(0);
    }
  }, [formData, onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    disabled: uploading
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="luxury-card p-8"
    >
      <h3 className="text-2xl font-elegant font-semibold text-gray-800 mb-6">
        Upload Media
      </h3>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300
          ${isDragActive 
            ? 'border-luxury-red bg-luxury-red/5' 
            : 'border-gray-300 hover:border-luxury-red hover:bg-luxury-red/5'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div className="space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-luxury-red border-t-transparent rounded-full mx-auto"
            ></motion.div>
            <div>
              <p className="text-lg font-medium text-gray-800">Uploading...</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <motion.div
                  className="bg-luxury-red h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{uploadProgress}%</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-luxury-red/10 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-luxury-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-800">
                {isDragActive ? 'Drop the file here' : 'Drag & drop your media here'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                or click to browse files
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Supports: JPG, PNG, GIF, MP4, MOV, AVI, WEBM (max 50MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Form Fields */}
      <div className="mt-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter media title"
              disabled={uploading}
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-input"
              disabled={uploading}
            >
              <option value="Portrait">Portrait</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Fashion">Fashion</option>
              <option value="Style">Style</option>
              <option value="Moments">Moments</option>
              <option value="Beauty">Beauty</option>
              <option value="Elegance">Elegance</option>
              <option value="Grace">Grace</option>
              <option value="Living">Living</option>
              <option value="Events">Events</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="form-textarea"
            placeholder="Describe your media..."
            disabled={uploading}
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter tags separated by commas"
            disabled={uploading}
          />
        </div>

        <div>
          <label htmlFor="metadata" className="block text-sm font-medium text-gray-700 mb-2">
            Metadata (JSON)
          </label>
          <textarea
            id="metadata"
            name="metadata"
            value={formData.metadata}
            onChange={handleInputChange}
            rows={2}
            className="form-textarea"
            placeholder='{"camera": "iPhone 14", "location": "Paris"}'
            disabled={uploading}
          />
        </div>
      </div>

      {/* Upload Tips */}
      <div className="mt-8 p-4 bg-luxury-red/5 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Upload Tips:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Use high-quality images for best results</li>
          <li>• Add descriptive titles and tags for better organization</li>
          <li>• Include metadata like camera model or location</li>
          <li>• Videos will be automatically compressed for web</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default MediaUpload;
