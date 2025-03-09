import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Canteens = () => {
    const canteens = [
        { name: 'Annapurna Canteen', rating: '5', img: 'https://i.pinimg.com/474x/a0/29/82/a02982aadcf4a290c98d2f57ad0858f4.jpg' },
        { name: 'Cocacola Canteen', rating: '4.6', img: 'https://i.pinimg.com/474x/a0/29/82/a02982aadcf4a290c98d2f57ad0858f4.jpg' },
        { name: 'Bakery', rating: '4', img: 'https://i.pinimg.com/474x/a0/29/82/a02982aadcf4a290c98d2f57ad0858f4.jpg' },
        { name: 'Gandikota Dosa', rating: '4.8', img: 'https://i.pinimg.com/474x/a0/29/82/a02982aadcf4a290c98d2f57ad0858f4.jpg' },
        { name: 'MBA Canteen', rating: '4.7', img: 'https://i.pinimg.com/474x/a0/29/82/a02982aadcf4a290c98d2f57ad0858f4.jpg' }
    ];

    return (
        <section id="canteen">
            <h1>OUR CANTEENS</h1>
            <div className="can">
                {canteens.map((canteen, index) => (
                    <div key={index} className="menu-item">
                        <img src={canteen.img} alt={canteen.name} />
                        <h3>{canteen.name}</h3>
                        <p>Rating: {canteen.rating} <i className="fa-solid fa-star"></i></p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Canteens;