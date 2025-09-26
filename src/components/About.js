import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section-padding bg-soft-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="heading-secondary text-luxury-red mb-4"
            >
              About Titu
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="w-24 h-1 bg-luxury-red mx-auto rounded-full"
            ></motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white"
                >
                  <img 
                    src="/images/titu-avatar.jpg" 
                    alt="Titu - Elegant Portrait"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-luxury-red/20 to-elegant-red/20 flex items-center justify-center" style={{display: 'none'}}>
                    <div className="text-center text-gray-500">
                      <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      <p className="text-sm">Profile Photo</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Decorative elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-8 h-8 border-2 border-luxury-red rounded-full"
                ></motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-4 -left-4 w-6 h-6 border-2 border-luxury-red rounded-full"
                ></motion.div>
              </div>
            </motion.div>

            {/* About Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-elegant font-semibold text-gray-800 mb-6">
                A Story of Elegance & Grace
              </h3>
              
              <p className="text-elegant">
                Titu embodies the perfect blend of sophistication and warmth, creating an aura 
                of luxury that captivates everyone around her. With an innate sense of style 
                and an eye for beauty, she transforms ordinary moments into extraordinary experiences.
              </p>
              
              <p className="text-elegant">
                Her journey is marked by elegance, determination, and a passion for excellence. 
                Whether in personal pursuits or professional endeavors, Titu brings a touch 
                of luxury and refinement that sets her apart.
              </p>
              
              <p className="text-elegant">
                This space celebrates her unique spirit, showcasing the beauty, grace, and 
                sophistication that define her world.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <button className="luxury-btn mt-8">
                  Learn More
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
