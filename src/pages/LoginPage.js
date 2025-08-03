import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { Alert } from 'react-bootstrap';

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState('');

    const handleLogin = async ({ email, password }) => {
        setError('');
        try {
            const response = await api.post('/auth/login', { email, password });
            login(response.data.token);
            navigate('/users');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div>
            {error && <Alert variant="danger" className="text-center my-3">{error}</Alert>}
            <AuthForm type="login" onSubmit={handleLogin} />
            <p className="text-center mt-3">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}

export default LoginPage;