// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate here
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';


const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login'); // Add navigate to the login page after logout
    };

    return (
        <BootstrapNavbar bg="primary" variant="dark" expand="lg">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
                {!isLoggedIn && (
                    <>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Nav.Link as={Link} to="/bookings">Bookings</Nav.Link>
                        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                    </>
                )}
            </Nav>
        </BootstrapNavbar>
    );
};

export default Navbar;
