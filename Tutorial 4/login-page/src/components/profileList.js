import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './profileList.css';

const ProfileList = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://express-t4.onrender.com/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = users.filter(user => {
        const name = user.name ? user.name.toLowerCase() : '';
        const searchTermLower = searchTerm.toLowerCase();
        return name.includes(searchTermLower);
    });

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/150';
    };

    return (
        <div className="profile-listing-container">
            <h1>Profile Listing</h1>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className="user-list">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <div 
                            key={user._id} 
                            className="user-card" 
                            onClick={() => navigate(`/profile/${user._id}`)}
                        >
                            <img 
                                src={user.picture || 'https://via.placeholder.com/150'} 
                                alt={user.name || 'No Name'} 
                                onError={handleImageError}
                            />
                            <h2>{user.name || 'No Name'}</h2>
                        </div>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>
        </div>
    );
};

export default ProfileList;
