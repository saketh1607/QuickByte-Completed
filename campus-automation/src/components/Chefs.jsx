import React from 'react';
import './Chefs.css'; // Create a new CSS file for chefs

const Chefs = () => {
    const chefs = [
        { 
            name: 'Bhanu Prakash', 
            experience: '20 years', 
            img: 'https://static.vecteezy.com/system/resources/previews/000/615/019/original/vector-cartoon-smiling-chef-character.jpg',
            specialty: 'Indian Cuisine'
        },
        { 
            name: 'Mahendraditya', 
            experience: '60 years', 
            img: 'https://wallpapercave.com/wp/wp1882339.jpg',
            specialty: 'Italian Cuisine'
        },
        { 
            name: 'Anjith', 
            experience: '15 years', 
            img: 'https://preview.redd.it/if-sanji-tells-you-that-he-will-cook-any-dish-for-you-that-v0-txrdpkzu2fqb1.jpg?auto=webp&s=3cecbad31936393ee734a95dab67cfe30d77cb94',
            specialty: 'All rounder'
        },
        { 
            name: 'Abhishek', 
            experience: '32 years', 
            img: 'https://cdn.dribbble.com/users/3399824/screenshots/6521075/mascot-2-04.jpg',
            specialty: 'Fusion Cuisine'
        },
        { 
            name: 'Harshith', 
            experience: '7 years', 
            img: 'https://cdn.pixabay.com/photo/2024/01/13/18/38/chef-8506385_640.jpg',
            specialty: 'Desserts'
        }
    ];

    return (
        <section className="chefs-section" id="chef">
            <div className="container">
                <h2 className="section-title">Meet Our Master Chefs</h2>
                <p className="section-subtitle">The culinary geniuses behind your favorite dishes</p>
                <div className="chefs-grid">
                    {chefs.map((chef, index) => (
                        <div key={index} className="chef-card">
                            <div className="chef-image">
                                <img src={chef.img} alt={chef.name} />
                                <div className="chef-overlay">
                                    <h3>{chef.name}</h3>
                                    <p className="specialty">{chef.specialty}</p>
                                </div>
                            </div>
                            <div className="chef-info">
                                <p className="experience">{chef.experience} of experience</p>
                                <div className="social-links">
                                    <a href="#"><i className="fab fa-instagram"></i></a>
                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                    <a href="#"><i className="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Chefs;