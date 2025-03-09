import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Menu = ({ menuItems, onOrder, onAddToCart, onShowNutrition }) => {
    return (
        <section className="menu" id="menuSection">
            <div className="container">
                <h2>Our Menu</h2>
                <div className="menu-items">
                    {menuItems.map(item => (
                        <div key={item.id} className="menu-item">
                            <img src={item.img} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>₹{item.price}</p>
                            <button className="nutrition-btn" onClick={() => onShowNutrition(item.id)}>Nutrition Info</button>
                            <div className="buttons">
                                <button className="order-btn" onClick={() => onOrder(item.id)}>Order Now</button>
                                <button className="cart-btn" onClick={() => onAddToCart(item.id)}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Menu;