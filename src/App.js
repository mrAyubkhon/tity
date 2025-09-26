import React from 'react';
import { Toaster } from 'react-hot-toast';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import LuxuryCalendar from './components/LuxuryCalendar';
import Quotes from './components/Quotes';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import BackgroundAnimation from './components/BackgroundAnimation';

function App() {
  return (
    <div className="App">
      <BackgroundAnimation />
      <Navigation />
      <Hero />
      <About />
      <Gallery />
      <LuxuryCalendar />
      <Quotes />
      <Contact />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#DC2626',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#DC2626',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;
