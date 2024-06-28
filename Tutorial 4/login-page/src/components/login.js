import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email format
        if (!validateEmail(email)) {
            alert('Please enter a valid email format.');
            return;
        }

        // Validate password complexity
        if (!validatePassword(password)) {
            alert('Password must be at least 8 characters long, contain at least one special character (!@#$&*), one capital letter, and one number.');
            return;
        }

        const loginData = {
            username: email,
            password: password
        };

        try {
            const response = await fetch('https://express-t4.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            const data = await response.json();
            if (response.ok) {
                navigate('/profiles');
            } else {
                alert('Login failed. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    };

    const validateEmail = (email) => {
        // Regular expression for basic email format validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        // Regular expression for password validation: at least 8 characters, 1 special character, 1 capital letter, 1 number
        return /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(password);
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
