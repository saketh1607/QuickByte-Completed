import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Chefs = () => {
    const chefs = [
        { name: 'Bhanu Prakash', experience: '20 years', img: 'https://tse1.mm.bing.net/th?id=OIP.e_C95r_y1d0fHc1IAEBzQQHaJF&pid=Api&P=0&h=180' },
        { name: 'Chef1', experience: '60 years', img: 'https://tse1.mm.bing.net/th?id=OIP.e_C95r_y1d0fHc1IAEBzQQHaJF&pid=Api&P=0&h=180' },
        { name: 'Abhishek', experience: '30 years', img: 'https://tse1.mm.bing.net/th?id=OIP.e_C95r_y1d0fHc1IAEBzQQHaJF&pid=Api&P=0&h=180' },
        { name: 'Chef2', experience: '7 years', img: 'https://tse1.mm.bing.net/th?id=OIP.e_C95r_y1d0fHc1IAEBzQQHaJF&pid=Api&P=0&h=180' }
    ];

    return (
        <section className="chefs" id="chef">
            <h1>OUR CHEFS</h1>
            <div className="che">
                {chefs.map((chef, index) => (
                    <div key={index} className="menu-item">
                        <img src={chef.img} alt={chef.name} />
                        <h3>{chef.name}</h3>
                        <p>Experience: {chef.experience}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Chefs;