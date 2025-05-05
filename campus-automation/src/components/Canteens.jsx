import React from 'react';
import './Canteens.css'; // Create a new CSS file for canteens

const Canteens = () => {
    const canteens = [
        { 
            name: 'Annapurna Canteen', 
            rating: '5', 
            img: 'https://static.vecteezy.com/system/resources/previews/000/168/284/original/canteen-vector-illustration.jpg',
            description: 'Authentic Indian meals with a homely touch.'
        },
        { 
            name: 'Cocacola Canteen', 
            rating: '4.6', 
            img: 'https://img.freepik.com/free-vector/cozy-empty-canteen-interior-cartoon-illustration_74855-18274.jpg',
            description: 'Quick bites and refreshing beverages.'
        },
        { 
            name: 'Bakery', 
            rating: '4', 
            img: 'https://static.vecteezy.com/system/resources/previews/000/473/001/original/vector-bakery-shop-design-concept.jpg',
            description: 'Freshly baked goods and sweet treats.'
        },
        { 
            name: 'Gandikota Dosa', 
            rating: '4.8', 
            img: 'https://static.vecteezy.com/system/resources/previews/008/253/760/non_2x/school-canteen-with-different-races-pupils-in-protective-masks-standing-in-line-to-take-food-and-sitting-at-table-eating-school-life-during-covid-19-pandemic-flat-illustration-vector.jpg',
            description: 'South Indian specialties and crispy dosas.'
        },
        { 
            name: 'MBA Canteen', 
            rating: '4.7', 
            img: 'https://static.vecteezy.com/system/resources/previews/000/170/551/original/free-canteen-vectors.jpg',
            description: 'Gourmet meals for the modern palate.'
        }
    ];

    return (
        <section className="canteens-section" id="canteen">
            <div className="container">
                <h2 className="section-title">Explore Our Canteens</h2>
                <p className="section-subtitle">Discover the diverse culinary experiences on campus</p>
                <div className="canteens-grid">
                    {canteens.map((canteen, index) => (
                        <div key={index} className="canteen-card">
                            <div className="canteen-image">
                                <img src={canteen.img} alt={canteen.name} />
                                <div className="canteen-overlay">
                                    <h3>{canteen.name}</h3>
                                    <p className="description">{canteen.description}</p>
                                </div>
                            </div>
                            <div className="canteen-info">
                                <div className="rating">
                                    <span className="stars">★★★★★</span>
                                    <span className="rating-value">{canteen.rating}</span>
                                </div>
                                <button className="visit-btn">Visit Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Canteens;