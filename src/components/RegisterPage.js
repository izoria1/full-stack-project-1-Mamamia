import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;
