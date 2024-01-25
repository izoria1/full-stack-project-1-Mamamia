// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MenuPage from './components/MenuPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import BookingsPage from './components/BookingsPage';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/bookings" element={<BookingsPage />} />
                {/* Other routes */}
            </Routes>
        </Router>
    );
};

export default App;
