import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const generatedOrderNumber = `#${Math.floor(Math.random() * 90000) + 10000}`;
        setOrderNumber(generatedOrderNumber);
    }, []);

    const handleBackToMenu = () => {
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl text-center">
                <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
                <p>Your order number is <span className="font-bold">{orderNumber}</span></p>
                <p>Thank you for your order!</p>
                <button className="bg-blue-500 text-white p-2 rounded-lg mt-4" onClick={handleBackToMenu}>
                    Back to Menu
                </button>
            </div>
        </div>
    );
};

export default Confirmation;
