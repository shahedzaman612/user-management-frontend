import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/UserTable';
import TableToolbar from '../components/TableToolbar';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { Button, Spinner } from 'react-bootstrap';

function UserManagementPage() {
    const [users, setUsers] = useState([]);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('info');
    const navigate = useNavigate();
    const { logout } = useAuth();

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setMessage('');
        try {
            const response = await api.get('/users');
            setUsers(response.data);
            setSelectedUserIds([]); // Clear selection after fetching new data
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setMessage(error.response?.data?.message || 'Failed to load users.');
            setVariant('danger');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allUserIds = users.map(user => user.id);
            setSelectedUserIds(allUserIds);
        } else {
            setSelectedUserIds([]);
        }
    };

    const handleSelectUser = (userId) => {
        setSelectedUserIds(prevSelected =>
            prevSelected.includes(userId)
                ? prevSelected.filter(id => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleAction = async (actionType) => {
        if (selectedUserIds.length === 0) {
            setMessage('Please select at least one user.');
            setVariant('warning');
            return;
        }

        try {
            let endpoint;
            let successMessage;

            switch (actionType) {
                case 'block':
                    endpoint = '/users/block';
                    successMessage = 'Users blocked successfully!';
                    break;
                case 'unblock':
                    endpoint = '/users/unblock';
                    successMessage = 'Users unblocked successfully!';
                    break;
                case 'delete':
                    endpoint = '/users/delete';
                    successMessage = 'Users deleted successfully!';
                    break;
                default:
                    return;
            }

           // const response = await api.post(endpoint, { userIds: selectedUserIds });
            setMessage(successMessage);
            setVariant('success');
            fetchUsers(); 
        } catch (error) {
            console.error(`Error ${actionType}ing users:`, error);
            setMessage(error.response?.data?.message || `Failed to ${actionType} users.`);
            setVariant('danger');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>User Management Panel</h2>
                <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
            </div>
            <TableToolbar
                onBlock={() => handleAction('block')}
                onUnblock={() => handleAction('unblock')}
                onDelete={() => handleAction('delete')}
                selectedCount={selectedUserIds.length}
                message={message}
                variant={variant}
            />
            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading users...</span>
                    </Spinner>
                    <p>Loading users...</p>
                </div>
            ) : (
                <UserTable
                    users={users}
                    onSelectAll={handleSelectAll}
                    onSelectUser={handleSelectUser}
                    selectedUserIds={selectedUserIds}
                />
            )}
        </div>
    );
}

export default UserManagementPage;