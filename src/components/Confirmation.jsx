import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
    const { order, clearOrder } = useContext(OrderContext);
    const [orderNumber, setOrderNumber] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Generate a random order number
        const generateOrderNumber = () => {
            return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        };

        // Get the current date and time
        const getCurrentDate = () => {
            const date = new Date();
            return date.toLocaleString();
        };

        setOrderNumber(generateOrderNumber());
        setCurrentDate(getCurrentDate());

        // Clear the order after showing the confirmation
        return () => {
            clearOrder();
        };
    }, [clearOrder]);

    const getTotal = () => {
        return order.items.reduce((sum, item) => {
            const extrasTotal = item.extras ? item.extras.reduce((extraSum, extra) => extraSum + extra.price, 0) : 0;
            return sum + item.price + extrasTotal;
        }, 0).toFixed(2);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Order Confirmation</h1>
                <div className="text-left">
                    <p><strong>Order Number:</strong> {orderNumber}</p>
                    <p><strong>Date:</strong> {currentDate}</p>
                    <p><strong>Estimated Wait Time:</strong> {order.estimatedTime} minutes</p>
                    <p><strong>Order Type:</strong> {order.orderType}</p>
                    <h2 className="text-2xl font-bold mt-4 mb-2">Order Details</h2>
                    <ul className="divide-y divide-gray-200">
                        {order.items.map((item, index) => (
                            <li key={index} className="py-2">
                                <div className="flex justify-between">
                                    <span>{item.name}</span>
                                    <span>PLN {item.price.toFixed(2)}</span>
                                </div>
                                {item.extras && item.extras.length > 0 && (
                                    <ul className="ml-4 mt-2">
                                        {item.extras.map((extra, extraIndex) => (
                                            <li key={extraIndex} className="text-gray-500 flex justify-between">
                                                <span>{extra.name}</span>
                                                <span>+PLN {extra.price.toFixed(2)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-xl font-bold mt-4">Total: PLN {getTotal()}</h2>
                    <div className="mt-6 flex justify-center">
                        <button
                            className="bg-blue-500 text-white p-2 rounded-lg mx-auto"
                            onClick={() => navigate('/')}
                        >
                            Back to Menu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;
