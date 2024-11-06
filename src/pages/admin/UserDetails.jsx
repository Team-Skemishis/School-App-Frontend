import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneUser } from '../../services/users';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getOneUser(id);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    if (!user) return <div>User not found</div>;

    return (
        <div>
            <h2>User Details</h2>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            {/* Add more user details as needed */}
        </div>
    );
};

export default UserDetails;