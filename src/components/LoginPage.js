import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Form, Button, Container } from 'react-bootstrap';


const LoginPage = ({ setIsLoggedIn }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/token/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            localStorage.setItem('token', data.auth_token);
            setIsLoggedIn(true); // Update isLoggedIn state
            navigate('/bookings'); // Use navigate for redirection
        } catch (error) {
            console.error('Login failed:', error);
            // Handle login failure
        }
    };

    return (
        <Container className="mt-5">
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" name="username" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </Container>
    );
};

export default LoginPage;
