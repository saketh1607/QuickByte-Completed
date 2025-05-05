import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hero.css'; // Create a new CSS file for hero section

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Images for the slideshow (replace with your own URLs if needed)
  const images = [
    'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Delicious burger
    'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Pasta
    'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',  // Sushi
    'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 2000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="hero">
      {/* Slideshow */}
      <div className="slideshow">
        {images.map((img, index) => (
          <div 
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="container hero-content">
        <h1>Preorder Your Delicious Food</h1>
        <p>Explore our menu and order your favorite meals anytime, anywhere.</p>
        <button 
          className="cta-button"
          onClick={() => document.getElementById('menuSection').scrollIntoView({ behavior: 'smooth' })}
        >
          Explore Menu <i className="fas fa-arrow-down"></i>
        </button>
      </div>
    </section>
  );
};

export default Hero;