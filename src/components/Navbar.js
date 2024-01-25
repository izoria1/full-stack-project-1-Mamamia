// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import '../styles/Navbar.css'; // Import custom CSS for Navbar
import logo from '../assets/logo.png'; // Use '../' to move up one directory


const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <BootstrapNavbar bg="primary" variant="dark" expand="lg">
            <BootstrapNavbar.Brand as={Link} to="/">
                <img
                    src={logo} // or "/logo.png" if it's in the public folder
                    alt="Brand Logo"
                    height="30" // Adjust the size as needed
                    className="d-inline-block align-top"
                />
                {' '} Mama Mia!
            </BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/menu" className="nav-item">Menu</Nav.Link>
                    {!isLoggedIn && (
                        <>
                            <Nav.Link as={Link} to="/login" className="nav-item">Login</Nav.Link>
                            <Nav.Link as={Link} to="/register" className="nav-item">Register</Nav.Link>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <Nav.Link as={Link} to="/bookings" className="nav-item">Bookings</Nav.Link>
                            <button className="btn btn-secondary logout-button" onClick={handleLogout}>Log out</button>
                        </>
                    )}
                </Nav>
            </BootstrapNavbar.Collapse>
        </BootstrapNavbar>
    );
};

export default Navbar;
