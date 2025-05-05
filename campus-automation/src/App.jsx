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
import TrendingFood from "./components/TrendingFood";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

const App = () => {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: 'Veg Noodles',
      price: 60,
      img: 'https://images.pexels.com/photos/725990/pexels-photo-725990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'fastfood',
      nutrition: { calories: 250, fat: 10, protein: 6, carbs: 35 }
    },
    {
      id: 2,
      name: 'Mango Juice',
      price: 50,
      img: 'https://img.freepik.com/premium-photo/closeup-mango-juice-dripping-from-juicer_198067-285454.jpg',
      category: 'juices',
      nutrition: { calories: 150, fat: 1, protein: 2, carbs: 35 }
    },
    {
      id: 3,
      name: 'Plain Dosa',
      price: 40,
      img: 'https://www.awesomecuisine.com/wp-content/uploads/2009/06/Plain-Dosa.jpg',
      category: 'annapurna',
      nutrition: { calories: 200, fat: 8, protein: 4, carbs: 30 }
    },
    {
      id: 4,
      name: 'Egg Biryani',
      price: 100,
      img: 'https://d1lg8auwtggj9x.cloudfront.net/images/shutterstock_377228038.width-820.jpg',
      category: 'annapurna',
      nutrition: { calories: 150, fat: 4, protein: 5, carbs: 30 }
    },
    {
      id: 5,
      name: 'Manchurya',
      price: 60,
      img: 'https://wallpaperaccess.com/full/8996024.jpg',
      category: 'fastfood',
      nutrition: { calories: 350, fat: 18, protein: 7, carbs: 40 }
    },
    {
      id: 7,
      name: 'Manchurya Noodles',
      price: 70,
      img: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'fastfood',
      nutrition: { calories: 400, fat: 20, protein: 8, carbs: 50 }
    },
    {
      id: 8,
      name: 'Dry Maggi',
      price: 50,
      img: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'maggies',
      nutrition: { calories: 300, fat: 15, protein: 6, carbs: 40 }
    },
    {
      id: 9,
      name: 'Soupy Maggi',
      price: 55,
      img: 'https://tse1.mm.bing.net/th?id=OIP.Sw6agpuS6dU4nhQD6wjVcQHaEK&pid=Api&P=0&h=180',
      category: 'maggies',
      nutrition: { calories: 320, fat: 16, protein: 7, carbs: 42 }
    },
    {
      id: 10,
      name: 'Peri-Peri Fries',
      price: 50,
      img: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'fries',
      nutrition: { calories: 250, fat: 15, protein: 3, carbs: 30 }
    },
    {
      id: 11,
      name: 'Paneer Frankie',
      price: 60,
      img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'frankies',
      nutrition: { calories: 350, fat: 18, protein: 15, carbs: 35 }
    },
    {
      id: 12,
      name: 'Manchury Frankie',
      price: 60,
      img: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'frankies',
      nutrition: { calories: 380, fat: 20, protein: 14, carbs: 45 }
    },
    {
      id: 13,
      name: 'Paneer Schezwan',
      price: 65,
      img: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'frankies',
      nutrition: { calories: 370, fat: 18, protein: 16, carbs: 40 }
    },
    {
      id: 14,
      name: 'Masala Dosa',
      price: 55,
      img: 'https://img.freepik.com/premium-photo/masala-dosa-is-south-indian-meal-served-with-sambhar-coconut-chutney-selective-focus_466689-22958.jpg?w=2000',
      category: 'annapurna',
      nutrition: { calories: 250, fat: 10, protein: 6, carbs: 35 }
    },
    {
      id: 15,
      name: 'Onion Dosa',
      price: 45,
      img: 'https://ceylondosa.com/wp-content/uploads/2023/03/onion_dosa.jpeg',
      category: 'annapurna',
      nutrition: { calories: 260, fat: 11, protein: 5, carbs: 38 }
    },
    {
      id: 16,
      name: 'Apple Juice',
      price: 55,
      img: 'https://images7.alphacoders.com/105/1058450.jpg',
      category: 'juices',
      nutrition: { calories: 120, fat: 0, protein: 1, carbs: 30 }
    },
    {
      id: 17,
      name: 'Orange Juice',
      price: 55,
      img: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'juices',
      nutrition: { calories: 130, fat: 0, protein: 1, carbs: 35 }
    },
    {
      id: 18,
      name: 'Pizza',
      price: 120,
      img: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'fastfood',
      nutrition: { calories: 400, fat: 20, protein: 15, carbs: 50 }
    },
    {
      id: 19,
      name: 'Burger',
      price: 90,
      img: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'fastfood',
      nutrition: { calories: 450, fat: 25, protein: 20, carbs: 40 }
    }
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
              <TrendingFood/>
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