// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const CartPage = ({ cartItems, removeFromCart }) => {
//   const navigate = useNavigate();

//   const handleContinueShopping = () => {
//     navigate('/'); 
//   };

//   return (
//     <div className="cart-page">
//       <h1>Your Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="cart-items">
//           {cartItems.map((item) => (
//             <div key={item.id} className="cart-item">
//               <img src={item.img} alt={item.name} />
//               <h3>{item.name}</h3>
//               <p>₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
//               <button onClick={() => removeFromCart(item.id)}>Remove</button>
//             </div>
//           ))}
//         </div>
//       )}
//       <button onClick={handleContinueShopping}>Continue Shopping</button>
//     </div>
//   );
// };

// export default CartPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimeSlotSelector from './TimeSlotSelector';
import OrderQRCode from './OrderQRCode';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartPage = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleOrderNow = () => {
    setShowTimeSlots(true);
  };

  const handleTimeSlotSelect = async (timeSlot) => {
    setLoading(true);
    try {
      const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          timeSlot,
          totalAmount
        }),
      });

      const data = await response.json();
      setOrderId(data.orderId);
      setShowTimeSlots(false);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (orderId) {
    return <OrderQRCode orderId={orderId} />;
  }

  return (
    <div className="cart-page container py-5">
      <h1 className=" m-4 mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <button className="btn btn-primary" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item card mb-3">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={item.img} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} className="me-3" />
                    <div className='p-5'>
                      <h3 className="card-title">{item.name}</h3>
                      <p className="card-text">₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                  <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary card mt-4">
            <div className="card-body">
              <h3>Order Summary</h3>
              <p>Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
              <p>Total Amount: ₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}</p>
              <div className="d-flex gap-2">
                <button className="btn btn-secondary" onClick={handleContinueShopping}>
                  Continue Shopping
                </button>
                <button className="btn btn-primary" onClick={handleOrderNow}>
                  Order Now
                </button>
              </div>
            </div>
          </div>

          {showTimeSlots && (
            <div className="time-slots-container mt-4">
              <TimeSlotSelector onSelectTimeSlot={handleTimeSlotSelect} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;