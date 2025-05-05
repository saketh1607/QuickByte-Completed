// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// const Menu = ({ menuItems, onOrder, onAddToCart, onShowNutrition }) => {
//     return (
//         <section className="menu" id="menuSection">
//             <div className="container">
//                 <h2>Our Menu</h2>
//                 <div className="menu-items">
//                     {menuItems.map(item => (
//                         <div key={item.id} className="menu-item">
//                             <img src={item.img} alt={item.name} />
//                             <h3>{item.name}</h3>
//                             <p>₹{item.price}</p>
//                             <button className="nutrition-btn" onClick={() => onShowNutrition(item.id)}>Nutrition Info</button>
//                             <div className="buttons">
//                                 <button className="order-btn" onClick={() => onOrder(item.id)}>Order Now</button>
//                                 <button className="cart-btn" onClick={() => onAddToCart(item.id)}>Add to Cart</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Menu;
// In Menu.jsx
// Menu.jsx
// import React from 'react';
// import './Menu.css';
// const Menu = ({ menuItems, onOrder, onAddToCart, onShowNutrition }) => {
//     // Category configuration
//     const categoryConfig = {
//         all: { name: "All Items", icon: "🍔" },
//         fastfood: { name: "Fast Food Corner", icon: "🍟" },
//         annapurna: { name: "Annapurna Mess", icon: "🍛" },
//         juices: { name: "Fresh Juice Bar", icon: "🍹" },
//         maggies: { name: "Maggi Specialties", icon: "🍜" },
//         frankies: { name: "Frankie Station", icon: "🌯" },
//         fries: { name: "Snack Attack", icon: "🍟" }
//     };

//     // Group items only when showing all categories
//     const showCategories = menuItems.some(item => item.category);
//     const groupedItems = showCategories ? 
//         menuItems.reduce((acc, item) => {
//             const category = item.category;
//             if (!acc[category]) {
//                 acc[category] = {
//                     ...categoryConfig[category],
//                     items: []
//                 };
//             }
//             acc[category].items.push(item);
//             return acc;
//         }, {}) : 
//         { all: { items: menuItems } };

//     return (
//         <section className="menu" id="menuSection">
//             <div className="container">
//                 {Object.entries(groupedItems).map(([categoryKey, categoryData]) => (
//                     <div key={categoryKey} className="menu-category">
//                         {showCategories && (
//                             <div className="category-header">
//                                 <h3>
//                                     <span className="category-icon">{categoryData.icon}</span>
//                                     {categoryData.name}
//                                 </h3>
//                             </div>
//                         )}
                        
//                         <div className="menu-items">
//                             {categoryData.items.map(item => (
//                                 <div key={item.id} className="menu-item">
//                                     <img src={item.img} alt={item.name} />
//                                     <div className="item-info">
//                                         <h3>{item.name}</h3>
//                                         <p className="price">₹{item.price}</p>
//                                     </div>
//                                     <div className="item-actions">
//                                         <button 
//                                             className="nutrition-btn"
//                                             onClick={() => onShowNutrition(item.id)}
//                                         >
//                                             <i className="fas fa-info-circle"></i> Nutrition
//                                         </button>
//                                         <div className="action-buttons">
//                                             <button 
//                                                 className="order-btn"
//                                                 onClick={() => onOrder(item.id)}
//                                             >
//                                                 Order Now
//                                             </button>
//                                             <button 
//                                                 className="cart-btn"
//                                                 onClick={() => onAddToCart(item.id)}
//                                             >
//                                                 <i className="fas fa-cart-plus"></i>
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default Menu;
import React from 'react';
import './Menu.css';

const Menu = ({ menuItems, onOrder, onAddToCart, onShowNutrition }) => {
   
    const categoryConfig = {
        all: { name: "All Items", icon: "🍽️", color: "#FF6F00" },
        fastfood: { name: "Fast Food Corner", icon: "🍔", color: "#FF8F00" },
        annapurna: { name: "Annapurna Mess", icon: "🍛", color: "#FF6F6F" },
        juices: { name: "Fresh Juice Bar", icon: "🍹", color: "#FFC107" },
        maggies: { name: "Maggi Specialties", icon: "🍜", color: "#FF9800" },
        frankies: { name: "Frankie Station", icon: "🌯", color: "#FF5722" },
        fries: { name: "Snack Attack", icon: "🍟", color: "#FFA726" }
    };

    const showCategories = menuItems.some(item => item.category);
    const groupedItems = showCategories ? 
        menuItems.reduce((acc, item) => {
            const category = item.category;
            if (!acc[category]) {
                acc[category] = {
                    ...categoryConfig[category],
                    items: []
                };
            }
            acc[category].items.push(item);
            return acc;
        }, {}) : 
        { all: { items: menuItems } };

    return (
        <section className="menu" id="menuSection">
            <div className="container">
                {Object.entries(groupedItems).map(([categoryKey, categoryData]) => (
                    <div key={categoryKey} className="menu-category">
                        {showCategories && (
                            <div className="category-header" style={{ borderColor: categoryData.color }}>
                                <div className="category-icon-wrapper" style={{ backgroundColor: categoryData.color }}>
                                    <span className="category-icon">{categoryData.icon}</span>
                                </div>
                                <h3>{categoryData.name}</h3>
                                <div className="category-line" style={{ backgroundColor: categoryData.color }}></div>
                            </div>
                        )}
                        
                        <div className="menu-items">
                            {categoryData.items.map(item => (
                                <div key={item.id} className="menu-item">
                                    <div className="item-image">
                                        <img src={item.img} alt={item.name} />
                                        <div className="item-overlay">
                                            <button 
                                                className="nutrition-btn"
                                                onClick={() => onShowNutrition(item.id)}
                                            >
                                                <i className="fas fa-info-circle"></i> Nutrition
                                            </button>
                                        </div>
                                    </div>
                                    <div className="item-info">
                                        <h3>{item.name}</h3>
                                        <p className="price">₹{item.price}</p>
                                        <div className="item-rating">
                                            <span className="stars">★★★★☆</span>
                                            <span className="rating-value">4.2</span>
                                        </div>
                                    </div>
                                    <div className="item-actions">
                                        <button 
                                            className="order-btn"
                                            onClick={() => onOrder(item.id)}
                                        >
                                            Order Now
                                        </button>
                                        <button 
                                            className="cart-btn"
                                            onClick={() => onAddToCart(item.id)}
                                        >
                                            <i className="fas fa-cart-plus"></i> Add
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Menu;