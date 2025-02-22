import React, { useEffect, useState } from 'react';
import { useUser } from '../app/context/userContext'; // Assuming you have a user context
import { fetchOrderHistory, fetchSavedAddresses } from '../api/userApi'; // API calls to fetch data

const UserProfile = () => {
    const { user } = useUser(); // Get user data from context
    const [orderHistory, setOrderHistory] = useState([]);
    const [savedAddresses, setSavedAddresses] = useState([]);

    useEffect(() => {
        const loadUserData = async () => {
            const orders = await fetchOrderHistory(user.id);
            const addresses = await fetchSavedAddresses(user.id);
            setOrderHistory(orders);
            setSavedAddresses(addresses);
        };

        if (user) {
            loadUserData();
        }
    }, [user]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">User Profile</h1>
            <div className="mt-4">
                <h2 className="text-xl">User Details</h2>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                {/* Add more user details as needed */}
            </div>

            <div className="mt-4">
                <h2 className="text-xl">Order History</h2>
                <ul>
                    {orderHistory.map(order => (
                        <li key={order.id}>
                            Order ID: {order.id} - Total: {order.total} - Status: {order.status}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <h2 className="text-xl">Saved Addresses</h2>
                <ul>
                    {savedAddresses.map(address => (
                        <li key={address.id}>
                            {address.street}, {address.city}, {address.state}, {address.zip}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserProfile; 