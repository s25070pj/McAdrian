import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

const Home = () => {
    const navigate = useNavigate();
    const { setOrderType } = useContext(OrderContext);

    const handleChoice = (choice) => {
        setOrderType(choice);
        navigate('/menu');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
                <h1 className="text-3xl font-bold mb-6">Welcome</h1>
                <p className="mb-4">Please select your order type:</p>
                <div className="flex justify-around">
                    <button
                        className="bg-green-500 text-white p-4 rounded-lg"
                        onClick={() => handleChoice('Dine In')}
                    >
                        Dine In
                    </button>
                    <button
                        className="bg-blue-500 text-white p-4 rounded-lg"
                        onClick={() => handleChoice('Takeaway')}
                    >
                        Takeaway
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
