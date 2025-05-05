import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './TrendingFood.css';

const TrendingFood = () => {
  const trendingItems = [
    { title: "Burger", img: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { title: "Pizza", img: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { title: "Manchurya", img: "https://wallpaperaccess.com/full/8996024.jpg" },
    { title: "Paneer Frankie", img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
    { title: "Pasta", img: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  ];

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "cubic-bezier(0.165, 0.84, 0.44, 1)",
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "30px",
        }
      }
    ]
  };

  return (
    <div className="trending-container">
      <h2 className="carousel-title">Trending Food</h2>
      <div className="carousel-wrapper">
        <Slider {...settings}>
          {trendingItems.map((item, index) => (
            <div key={index} className="slide-item">
              <motion.div 
                className="carousel-card"
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="image-container">
                  <img src={item.img} alt={item.title} className="food-img" />
                </div>
                <div className="food-title-container">
                  <h3 className="food-title">{item.title}</h3>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TrendingFood;