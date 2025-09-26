import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Placeholder gallery data
  const galleryImages = [
    { id: 1, title: "Elegant Portrait", category: "Portrait" },
    { id: 2, title: "Luxury Lifestyle", category: "Lifestyle" },
    { id: 3, title: "Fashion Forward", category: "Fashion" },
    { id: 4, title: "Sophisticated Style", category: "Style" },
    { id: 5, title: "Graceful Moments", category: "Moments" },
    { id: 6, title: "Refined Beauty", category: "Beauty" },
    { id: 7, title: "Chic Elegance", category: "Elegance" },
    { id: 8, title: "Timeless Grace", category: "Grace" },
    { id: 9, title: "Luxury Living", category: "Living" }
  ];

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
          {/* Placeholder for image */}
          <div className="text-center text-gray-500 group-hover:text-luxury-red transition-colors duration-300">
            <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            <p className="text-sm font-medium">{image.title}</p>
            <p className="text-xs opacity-70">{image.category}</p>
          </div>
          
          {/* Hover overlay */}
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
              <svg className="w-6 h-6 text-luxury-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </motion.div>
          </motion.div>
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

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {galleryImages.map((image, index) => (
            <GalleryItem key={image.id} image={image} index={index} />
          ))}
        </motion.div>

        {/* Modal for image preview */}
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
                className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-elegant font-semibold text-gray-800">
                    {selectedImage.title}
                  </h3>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="text-gray-500 hover:text-luxury-red transition-colors duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="aspect-square bg-gradient-to-br from-luxury-red/10 to-elegant-red/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                    <p className="text-lg font-medium">{selectedImage.title}</p>
                    <p className="text-sm opacity-70">{selectedImage.category}</p>
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
