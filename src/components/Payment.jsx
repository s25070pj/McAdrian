import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (paymentMethod === 'card') {
            setTimeout(() => {
                navigate('/confirmation');
            }, 5000);
        }
    }, [paymentMethod, navigate]);

    const handlePaymentSelection = (method) => {
        setPaymentMethod(method);
        if (method === 'cash') {
            navigate('/confirmation');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            {paymentMethod === '' && (
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                    <h1 className="text-3xl font-bold mb-6 text-center">Select Payment Method</h1>
                    <div className="flex justify-around">
                        <button className="bg-blue-500 text-white p-4 rounded-lg" onClick={() => handlePaymentSelection('card')}>
                            Card
                        </button>
                        <button className="bg-yellow-500 text-white p-4 rounded-lg" onClick={() => handlePaymentSelection('blik')}>
                            Blik
                        </button>
                        <button className="bg-green-500 text-white p-4 rounded-lg" onClick={() => handlePaymentSelection('cash')}>
                            Cash at Counter
                        </button>
                    </div>
                </div>
            )}
            {paymentMethod === 'card' && (
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl text-center">
                    <h1 className="text-3xl font-bold mb-6">Card Payment</h1>
                    <p>Please follow the instructions on the terminal.</p>
                </div>
            )}
            {paymentMethod === 'blik' && (
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl text-center">
                    <h1 className="text-3xl font-bold mb-6">Blik Payment</h1>
                    <p>Please follow the instructions on the terminal.</p>
                </div>
            )}
        </div>
    );
};

export default Payment;
