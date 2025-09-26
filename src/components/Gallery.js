import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mediaAPI } from '../services/api';
import toast from 'react-hot-toast';

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    search: ''
  });

  // Fetch media from API
  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const response = await mediaAPI.getMedia({
          page: currentPage,
          limit: 12,
          ...filters
        });
        setMedia(response.media);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error('Error fetching media:', error);
        toast.error('Failed to load gallery');
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [currentPage, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const GalleryItem = ({ item, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="group cursor-pointer"
      onClick={() => setSelectedMedia(item)}
    >
      <div className="luxury-card overflow-hidden">
        <div className="aspect-square relative overflow-hidden">
          {item.type === 'video' ? (
            <video
              className="w-full h-full object-cover"
              poster={item.thumbnail}
              muted
            >
              <source src={item.url} type="video/mp4" />
            </video>
          ) : (
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          )}
          
          {/* Overlay */}
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
              {item.type === 'video' ? (
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

          {/* Type Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.type === 'video' 
                ? 'bg-luxury-red text-white' 
                : 'bg-white text-luxury-red'
            }`}>
              {item.type}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-800 mb-1">{item.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{item.category}</p>
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag, idx) => (
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

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-red focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="photo">Photos</option>
            <option value="video">Videos</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-red focus:border-transparent"
          >
            <option value="">All Categories</option>
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

          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-red focus:border-transparent"
          />
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-luxury-red border-t-transparent rounded-full"
            ></motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {media.map((item, index) => (
              <GalleryItem key={item._id} item={item} index={index} />
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-luxury-red text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-luxury-red hover:text-white'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Media Modal */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedMedia(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-elegant font-semibold text-gray-800">
                      {selectedMedia.title}
                    </h3>
                    <p className="text-gray-600">{selectedMedia.category}</p>
                  </div>
                  <button
                    onClick={() => setSelectedMedia(null)}
                    className="text-gray-500 hover:text-luxury-red transition-colors duration-300"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    {selectedMedia.type === 'video' ? (
                      <video
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                      >
                        <source src={selectedMedia.url} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={selectedMedia.url}
                        alt={selectedMedia.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {selectedMedia.description && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Description</h4>
                      <p className="text-gray-600">{selectedMedia.description}</p>
                    </div>
                  )}

                  {selectedMedia.tags && selectedMedia.tags.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMedia.tags.map((tag, index) => (
                          <span key={index} className="bg-luxury-red/10 text-luxury-red px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedMedia.metadata && Object.keys(selectedMedia.metadata).length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {Object.entries(selectedMedia.metadata).map(([key, value]) => (
                          <div key={key}>
                            <span className="font-medium text-gray-700 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="text-gray-600 ml-2">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
