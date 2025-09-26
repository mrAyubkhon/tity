import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
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
      <Quotes />
      <Contact />
    </div>
  );
}

export default App;
