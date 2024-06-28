import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const OrderSummary = () => {
    const { order, removeFromOrder, addToOrder, clearOrder } = useContext(OrderContext);
    const { data: recommendedProducts, loading, error } = useFetch('http://localhost:8080/api/menu');
    const navigate = useNavigate();

    const getTotal = () => {
        return order.items.reduce((sum, item) => {
            const extrasTotal = item.extras ? item.extras.reduce((extraSum, extra) => extraSum + extra.price, 0) : 0;
            return sum + item.price + extrasTotal;
        }, 0).toFixed(2);
    };

    const handleCancelOrder = () => {
        clearOrder();
        navigate('/');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const recommendedProductsToShow = recommendedProducts.slice(0, 3);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Order Summary</h1>
                <div className="text-left">
                    <ul className="divide-y divide-gray-200 mb-4">
                        {order.items.map((item, index) => (
                            <li key={index} className="py-2 flex justify-between">
                                <div>
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p className="text-gray-600">PLN {item.price}</p>
                                    {item.extras && item.extras.length > 0 && (
                                        <ul className="ml-4 mt-2">
                                            {item.extras.map((extra, extraIndex) => (
                                                <li key={extraIndex} className="text-gray-500">
                                                    {extra.name} (+PLN {extra.price})
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <button className="bg-red-500 text-white p-1 rounded" onClick={() => removeFromOrder(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-xl font-bold mt-4 text-center">Total: PLN {getTotal()}</h2>
                    <h3 className="text-lg mt-2 text-center">Estimated wait time: {order.estimatedTime} minutes</h3>
                    <div className="mt-6 flex justify-center space-x-4">
                        <button className="bg-green-500 text-white p-2 rounded-lg" onClick={() => navigate('/payment')}>
                            Proceed to Payment
                        </button>
                        <button className="bg-red-500 text-white p-2 rounded-lg" onClick={handleCancelOrder}>Cancel Order</button>
                        <button className="bg-yellow-500 text-white p-2 rounded-lg" onClick={() => navigate('/')}>Back to Menu</button>
                    </div>
                    <h2 className="text-xl font-bold mt-4 mb-2 text-center">Add More Items</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {recommendedProductsToShow.map((product) => (
                            <div key={product.id} className="border p-4 rounded-lg shadow-lg">
                                <h3 className="font-bold">{product.name}</h3>
                                <p>{product.description}</p>
                                <p className="font-bold">PLN {product.price}</p>
                                <button className="bg-blue-500 text-white p-2 rounded-lg mt-2" onClick={() => addToOrder(product)}>Add to Order</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
