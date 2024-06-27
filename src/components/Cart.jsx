// Cart.jsx
import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';

const Cart = () => {
    const { order, removeFromOrder } = useContext(OrderContext);

    const getTotal = () => {
        return order.items.reduce((sum, item) => {
            const extrasTotal = item.extras ? item.extras.reduce((extraSum, extra) => extraSum + extra.price, 0) : 0;
            return sum + item.price + extrasTotal;
        }, 0).toFixed(2);
    };

    return (
        <div className="p-4 border rounded-lg shadow-lg h-full overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Your Order</h2>
            <ul>
                {order.items.map((item, index) => (
                    <li key={index} className="border-b mb-2 pb-2">
                        {item.name} - PLN {item.price}
                        {item.extras && item.extras.length > 0 && (
                            <ul>
                                {item.extras.map((extra, extraIndex) => (
                                    <li key={extraIndex}>
                                        {extra.name} (+PLN {extra.price})
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button className="bg-red-500 text-white p-1 rounded mt-2" onClick={() => removeFromOrder(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h2 className="font-bold">Total: PLN {getTotal()}</h2>
            <button className="bg-green-500 text-white p-2 rounded-lg mt-4">Proceed to Order Summary</button>
        </div>
    );
};

export default Cart;
