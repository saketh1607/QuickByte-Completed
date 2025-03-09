import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Chefs from './components/Chefs';
import Canteens from './components/Canteens';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import RatingModal from './components/RatingModal';
import CartPage from './components/CartPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

const App = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Veg Fried Rice', price: 60, img: 'https://tse1.mm.bing.net/th?id=OIP.4wrRVc6j3A9vtrOafulXigHaFM&pid=Api&P=0&h=180', category: 'fastfood', nutrition: { calories: 250, fat: 10, protein: 6, carbs: 35 } },
    { id: 2, name: 'Juice', price: 50, img: 'https://img.freepik.com/premium-photo/closeup-mango-juice-dripping-from-juicer_198067-285454.jpg', category: 'juices', nutrition: { calories: 150, fat: 1, protein: 2, carbs: 35 } },
    { id: 3, name: 'Plain Dosa', price: 40, img: 'https://oventales.com/wp-content/uploads/2017/05/Plain-Dosa002.jpg', category: 'annapurna', nutrition: { calories: 200, fat: 8, protein: 4, carbs: 30 } },
    { id: 4, name: 'Chapati', price: 50, img: 'https://media.istockphoto.com/id/526846282/photo/traditional-indian-roti-ready-to-serve.jpg?s=612x612&w=0&k=20&c=o3yyyZ4yjfwsgcZf1JIu0rice8cB2nLflh6EgF6c6pk=', category: 'annapurna', nutrition: { calories: 150, fat: 4, protein: 5, carbs: 30 } },
    { id: 5, name: 'Manchurya', price: 60, img: 'https://tse3.mm.bing.net/th?id=OIP.tXeX-3DTKJ2qatxZCACLbQHaE8&pid=Api&P=0&h=180', category: 'fastfood', nutrition: { calories: 350, fat: 18, protein: 7, carbs: 40 } },
    { id: 7, name: 'Manchurya Noodles', price: 70, img: 'https://i.ytimg.com/vi/MhiWI1bmbh0/maxresdefault.jpg', category: 'fastfood', nutrition: { calories: 400, fat: 20, protein: 8, carbs: 50 } },
    { id: 8, name: 'Dry Maggi', price: 50, img: 'https://i.ytimg.com/vi/gFJpjvDT3s4/maxresdefault.jpg', category: 'maggies', nutrition: { calories: 300, fat: 15, protein: 6, carbs: 40 } },
    { id: 9, name: 'Soupy Maggi', price: 55, img: 'https://tse1.mm.bing.net/th?id=OIP.Sw6agpuS6dU4nhQD6wjVcQHaEK&pid=Api&P=0&h=180', category: 'maggies', nutrition: { calories: 320, fat: 16, protein: 7, carbs: 42 } },
    { id: 10, name: 'Peri-Peri Fries', price: 50, img: 'https://tse3.mm.bing.net/th?id=OIP.7I78DZ3TcPF2E0BPUREqCgHaH4&pid=Api&P=0&h=180', category: 'fries', nutrition: { calories: 250, fat: 15, protein: 3, carbs: 30 } },
    { id: 11, name: 'Paneer Frankie', price: 60, img: 'https://tse3.mm.bing.net/th?id=OIP.VzrRoF2FmfsofGYWahJQQAHaEK&pid=Api&P=0&h=180', category: 'frankies', nutrition: { calories: 350, fat: 18, protein: 15, carbs: 35 } },
    { id: 12, name: 'Manchury Frankie', price: 60, img: 'https://i.ytimg.com/vi/V1cGyZUu8lM/hqdefault.jpg', category: 'frankies', nutrition: { calories: 380, fat: 20, protein: 14, carbs: 45 } },
    { id: 13, name: 'Paneer Schezwan', price: 65, img: 'https://i.ytimg.com/vi/9UlRvBhI398/maxresdefault.jpg', category: 'frankies', nutrition: { calories: 370, fat: 18, protein: 16, carbs: 40 } },
    { id: 14, name: 'Egg Maggi', price: 55, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP7x0Dn2SCKs2aJ4brEGgb4oabViOGkeE5GKzYkABoGCRmclgla9HlQM0F1RhplUfAZyY&usqp=CAU', category: 'maggies', nutrition: { calories: 330, fat: 18, protein: 14, carbs: 40 } },
    { id: 15, name: 'Masala Dosa', price: 45, img: 'https://media.istockphoto.com/photos/south-indian-breakfast-dosa-in-golden-brown-color-picture-id177266405?k=6&m=177266405&s=612x612&w=0&h=xjxOoDLbocEYTxSh_FIlnQR4bDQ89egLhaJN0UWkr6s=', category: 'annapurna', nutrition: { calories: 250, fat: 10, protein: 6, carbs: 35 } },
    { id: 16, name: 'Onion Dosa', price: 45, img: 'https://img.freepik.com/free-photo/delicious-indian-dosa-composition_23-2149086051.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1724025600&semt=ais_hybrid', category: 'annapurna', nutrition: { calories: 260, fat: 11, protein: 5, carbs: 38 } }
  ]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [timeSlotCounts, setTimeSlotCounts] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    fetchTimeSlotCounts();
  }, []);

  const fetchTimeSlotCounts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/timeslots/count');
      const data = await response.json();
      setTimeSlotCounts(data);
    } catch (error) {
      console.error('Error fetching time slot counts:', error);
    }
  };
  const handleSearch = (query) => {
    const filteredItems = menuItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    setMenuItems(filteredItems);
  };

  const handleFilterChange = (filterValue) => {
    let filteredItems = menuItems;
    if (filterValue === 'lowtohigh') {
      filteredItems = menuItems.slice().sort((a, b) => a.price - b.price);
    } else if (filterValue !== 'all') {
      filteredItems = menuItems.filter(item => item.category === filterValue);
    }
    setMenuItems(filteredItems);
  };


  const handleAddToCart = (itemId) => {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
      const existingItem = cartItems.find(cartItem => cartItem.id === itemId);
      if (existingItem) {
        existingItem.quantity += 1;
        setCartItems([...cartItems]);
      } else {
        setCartItems([...cartItems, { ...item, quantity: 1 }]);
      }
      alert(`${item.name} has been added to your cart.`);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };
  const handleShowNutrition = (itemId) => {
    const item = menuItems.find(item => item.id === itemId);
    if (item) {
      alert(`Nutritional Information for ${item.name}:\nCalories: ${item.nutrition.calories} kcal\nFat: ${item.nutrition.fat}g\nProtein: ${item.nutrition.protein}g\nCarbs: ${item.nutrition.carbs}g`);
    }
  };

  const handleSubmitFeedback = (rating, feedback) => {
    if (selectedItem) {
      alert(`Thank you for rating ${selectedItem.name}!\nRating: ${rating}\nFeedback: ${feedback}`);
      setSelectedItem(null);
      setShowRatingModal(false);
    }
  };

  return (
    <div className="App">
      <Navbar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        cartCount={cartItems.length}
        onCartClick={() => navigate('/cart')}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Menu
                menuItems={menuItems}
                onAddToCart={handleAddToCart}
                onShowNutrition={handleShowNutrition}
              />
              <Chefs />
              <Canteens />
              <Footer />
              <Chatbot />
              <RatingModal
                selectedItem={selectedItem}
                onClose={() => setShowRatingModal(false)}
                onSubmit={handleSubmitFeedback}
              />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              timeSlotCounts={timeSlotCounts}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;