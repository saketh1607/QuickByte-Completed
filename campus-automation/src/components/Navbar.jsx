import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Navbar = ({ onSearch, onFilterChange, cartCount, onCartClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [toggle, setToggle] = useState('canteen');

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY <= 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleToggle = (e) => {
    const value = e.target.value;
    setToggle(value);
    if (value === 'stationary') {
      window.location.href = "https://stationary-six.vercel.app/";
    }
  };

  return (
    <nav style={{
      // transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.4s ease-in-out',
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      zIndex: 1000
    }}>
      <div className="container nav-container">
        <div className="logo">
          <a href="#"><i className="fas fa-utensils"></i> QuickBite Campus</a>
        </div>

        {/* <div className="toggle-container">
          <span>Stationary</span>
          <input
            type="radio"
            name="toggle"
            value="stationary"
            checked={toggle === 'stationary'}
            onChange={handleToggle}
          />
          <input
            type="radio"
            name="toggle"
            value="canteen"
            checked={toggle === 'canteen'}
            onChange={handleToggle}
          />
          <span>Canteen</span>
        </div> */}

        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search for delicious food..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <div className="nav-items">
          <select onChange={(e) => onFilterChange(e.target.value)}>
            <option value="all">All</option>
            <option value="fastfood">Fast Food</option>
            <option value="annapurna">Annapurna Mess</option>
            <option value="juices">Juices</option>
            <option value="maggies">Maggies</option>
            <option value="frankies">Frankies</option>
            <option value="fries">Fries</option>
            <option value="lowtohigh">Price: Low to High</option>
          </select>
          <div className="cart" onClick={onCartClick}>
            <p className="inner">
              {cartCount} <i className="fa-solid fa-cart-shopping fa-xl"></i>
            </p>
          </div>
          <div className="profile">
            <a href="https://profile-fawn-eight.vercel.app/">
              <i className="fas fa-user-circle"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
