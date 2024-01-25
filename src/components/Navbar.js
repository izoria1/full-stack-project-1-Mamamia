// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate here

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login'); // Add navigate to the login page after logout
    };

    return (
        <nav>
            <Link to="/menu">Menu</Link>
            {!isLoggedIn && <Link to="/login">Login</Link>}
            {!isLoggedIn && <Link to="/register">Register</Link>}
            {isLoggedIn && <Link to="/bookings">Bookings</Link>}
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </nav>
    );
};

export default Navbar;
