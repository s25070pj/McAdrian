import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { Link, useNavigate } from 'react-router-dom';
import menuData from '../data/menu.json';

const OrderSummary = () => {
    const { order, removeFromOrder, addToOrder, clearOrder } = useContext(OrderContext);
    const navigate = useNavigate();

    const getTotal = () => {
        return order.items.reduce((sum, item) => {
            const extrasTotal = item.extras ? item.extras.reduce((extraSum, extra) => extraSum + extra.price, 0) : 0;
            return sum + item.price + extrasTotal;
        }, 0).toFixed(2);
    };

    const recommendedProducts = menuData.slice(0, 3);

    const handleCancelOrder = () => {
        clearOrder();
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Order Summary</h1>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <ul className="divide-y divide-gray-200">
                            {order.items.map((item, index) => (
                                <li key={index} className="py-4 flex justify-between items-center">
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
                                    <button className="bg-red-500 text-white p-1 rounded ml-4" onClick={() => removeFromOrder(index)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <h2 className="text-xl font-bold mt-4 text-center">Total: PLN {getTotal()}</h2>
                        <div className="mt-6 flex justify-center space-x-4">
                            <Link to="/payment">
                                <button className="bg-green-500 text-white p-2 rounded-lg">Proceed to Payment</button>
                            </Link>
                            <button className="bg-red-500 text-white p-2 rounded-lg" onClick={handleCancelOrder}>Cancel Order</button>
                            <Link to="/">
                                <button className="bg-yellow-500 text-white p-2 rounded-lg">Back to Menu</button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4 text-center">Add More Items</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {recommendedProducts.map((product) => (
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
        </div>
    );
};

export default OrderSummary;
