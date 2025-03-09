import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Hero = () => {
    return (
        <section className="hero">
            <div className="container hero-content">
                <h1>Delicious Food Delivered To You</h1>
                <p>Explore our menu and order your favorite meals anytime, anywhere.</p>
                <button onClick={() => document.getElementById('menuSection').scrollIntoView({ behavior: 'smooth' })}>
                    Explore Menu <i className="fas fa-arrow-down"></i>
                </button>
            </div>
        </section>
    );
};

export default Hero;