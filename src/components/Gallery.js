import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  // Enhanced gallery data with more details
  const galleryImages = [
    { 
      id: 1, 
      title: "Elegant Portrait", 
      category: "Portrait",
      type: "photo",
      description: "A stunning portrait showcasing timeless elegance and grace.",
      tags: ["portrait", "elegance", "beauty"],
      featured: true
    },
    { 
      id: 2, 
      title: "Luxury Lifestyle", 
      category: "Lifestyle",
      type: "photo",
      description: "Capturing the essence of luxury living and sophisticated style.",
      tags: ["lifestyle", "luxury", "sophistication"],
      featured: true
    },
    { 
      id: 3, 
      title: "Fashion Forward", 
      category: "Fashion",
      type: "photo",
      description: "Cutting-edge fashion that defines modern elegance.",
      tags: ["fashion", "style", "modern"],
      featured: false
    },
    { 
      id: 4, 
      title: "Sophisticated Style", 
      category: "Style",
      type: "photo",
      description: "Refined style that speaks volumes about personal taste.",
      tags: ["style", "refined", "personal"],
      featured: true
    },
    { 
      id: 5, 
      title: "Graceful Moments", 
      category: "Moments",
      type: "video",
      description: "Capturing those precious moments of pure grace and beauty.",
      tags: ["moments", "grace", "beauty"],
      featured: false
    },
    { 
      id: 6, 
      title: "Refined Beauty", 
      category: "Beauty",
      type: "photo",
      description: "Natural beauty enhanced by sophisticated presentation.",
      tags: ["beauty", "natural", "sophisticated"],
      featured: true
    },
    { 
      id: 7, 
      title: "Chic Elegance", 
      category: "Elegance",
      type: "photo",
      description: "Chic and elegant style that never goes out of fashion.",
      tags: ["chic", "elegance", "timeless"],
      featured: false
    },
    { 
      id: 8, 
      title: "Timeless Grace", 
      category: "Grace",
      type: "photo",
      description: "Timeless grace that transcends trends and seasons.",
      tags: ["timeless", "grace", "transcendent"],
      featured: true
    },
    { 
      id: 9, 
      title: "Luxury Living", 
      category: "Living",
      type: "video",
      description: "A glimpse into the world of luxury living and refined tastes.",
      tags: ["luxury", "living", "refined"],
      featured: false
    },
    { 
      id: 10, 
      title: "Evening Glamour", 
      category: "Events",
      type: "photo",
      description: "Evening glamour that lights up any special occasion.",
      tags: ["evening", "glamour", "special"],
      featured: true
    },
    { 
      id: 11, 
      title: "Artistic Vision", 
      category: "Portrait",
      type: "photo",
      description: "An artistic vision that captures the soul behind the beauty.",
      tags: ["artistic", "vision", "soul"],
      featured: false
    },
    { 
      id: 12, 
      title: "Modern Sophistication", 
      category: "Style",
      type: "video",
      description: "Modern sophistication meets classic elegance.",
      tags: ["modern", "sophistication", "classic"],
      featured: true
    }
  ];

  // Filter images based on selected filter
  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  // Get unique categories for filter
  const categories = ['all', ...new Set(galleryImages.map(img => img.category))];

  const GalleryItem = ({ image, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="group cursor-pointer"
      onClick={() => setSelectedImage(image)}
    >
      <div className="luxury-card overflow-hidden">
        <div className="aspect-square bg-gradient-to-br from-luxury-red/10 to-elegant-red/20 flex items-center justify-center relative overflow-hidden">
          {/* Enhanced placeholder with type indicator */}
          <div className="text-center text-gray-500 group-hover:text-luxury-red transition-colors duration-300">
            {image.type === 'video' ? (
              <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            ) : (
              <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
            )}
            <p className="text-sm font-medium">{image.title}</p>
            <p className="text-xs opacity-70">{image.category}</p>
            
            {/* Featured badge */}
            {image.featured && (
              <div className="absolute top-2 right-2">
                <span className="bg-luxury-red text-white text-xs px-2 py-1 rounded-full font-medium">
                  Featured
                </span>
              </div>
            )}
            
            {/* Type badge */}
            <div className="absolute top-2 left-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                image.type === 'video' 
                  ? 'bg-luxury-red text-white' 
                  : 'bg-white text-luxury-red'
              }`}>
                {image.type}
              </span>
            </div>
          </div>
          
          {/* Enhanced hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-luxury-red/20 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
            >
              {image.type === 'video' ? (
                <svg className="w-6 h-6 text-luxury-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6 text-luxury-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              )}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Enhanced card footer with tags */}
        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-1">{image.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{image.category}</p>
          {image.tags && image.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {image.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary text-luxury-red mb-4">
            Gallery
          </h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-luxury-red mx-auto rounded-full"
          ></motion.div>
          <p className="text-elegant mt-6 max-w-2xl mx-auto">
            A curated collection of moments that capture the essence of elegance, 
            style, and sophistication.
          </p>
        </motion.div>

        {/* Enhanced Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${
                filter === category
                  ? 'bg-luxury-red text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-luxury-red hover:text-white'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredImages.map((image, index) => (
            <GalleryItem key={image.id} image={image} index={index} />
          ))}
        </motion.div>

        {/* Enhanced Modal for image preview */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-elegant font-semibold text-gray-800">
                      {selectedImage.title}
                    </h3>
                    <p className="text-gray-600">{selectedImage.category}</p>
                  </div>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-gray-500 hover:text-luxury-red transition-colors duration-300"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="aspect-video bg-gradient-to-br from-luxury-red/10 to-elegant-red/20 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      {selectedImage.type === 'video' ? (
                        <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      ) : (
                        <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                      )}
                      <p className="text-lg font-medium">{selectedImage.title}</p>
                      <p className="text-sm opacity-70">{selectedImage.category}</p>
                    </div>
                  </div>

                  {selectedImage.description && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Description</h4>
                      <p className="text-gray-600">{selectedImage.description}</p>
                    </div>
                  )}

                  {selectedImage.tags && selectedImage.tags.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedImage.tags.map((tag, index) => (
                          <span key={index} className="bg-luxury-red/10 text-luxury-red px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedImage.type === 'video' 
                          ? 'bg-luxury-red text-white' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {selectedImage.type}
                      </span>
                      {selectedImage.featured && (
                        <span className="bg-luxury-red text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
