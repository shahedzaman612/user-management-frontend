import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import api from '../api';
import { Alert } from 'react-bootstrap';

function RegisterPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async ({ name, email, password }) => {
        setError('');
        setSuccess('');
        try {
            await api.post('/auth/register', { name, email, password });
            setSuccess('Registration successful! Please log in.');
            setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div>
            {error && <Alert variant="danger" className="text-center my-3">{error}</Alert>}
            {success && <Alert variant="success" className="text-center my-3">{success}</Alert>}
            <AuthForm type="register" onSubmit={handleRegister} />
            <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
}

export default RegisterPage;