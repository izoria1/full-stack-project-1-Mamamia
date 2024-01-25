import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';


const RegisterPage = () => {
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const navigate = useNavigate(); // useNavigate instead of useHistory

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                navigate('/login'); // Use navigate for redirection
            } else {
                console.log('Registration failed');
            }
        } catch (error) {
            console.error('There was an error:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" name="username" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit">Register</Button>
            </Form>
        </Container>
    );
};

export default RegisterPage;
