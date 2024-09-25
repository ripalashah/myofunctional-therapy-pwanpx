// frontend/src/components/UsersList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/users', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Ensure token is correct if needed
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                alert('Failed to load users. Please check the backend.');
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Users List</h2>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
