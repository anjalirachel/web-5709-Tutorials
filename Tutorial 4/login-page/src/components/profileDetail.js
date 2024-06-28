import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './profileDetail.css';

const ProfileDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://express-t4.onrender.com/api/users/${id}`);
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/150'; 
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-detail-container">
            <h1>Profile Detail</h1>
            <img
                src={user.picture || 'https://via.placeholder.com/150'}
                alt={`${user.firstName} ${user.lastName}`}
                onError={handleImageError}
            />
            <h2>{user.firstName} {user.lastName}</h2>
            <p><b>Name</b>: {user.name}</p>
            <p><b>Gender</b>: {user.gender}</p>
            <p><b>Age</b>: {user.age}</p>
            <p><b>Company</b>: {user.company}</p>
            <p><b>Email</b>: {user.email}</p>
            <p><b>Phone</b>: {user.phone}</p>
            <p><b>Address</b>: {user.address}</p>
        </div>
    );
};

export default ProfileDetail;
