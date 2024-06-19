import React, { useContext } from 'react';
import { OrderContext } from '../context/OrderContext';
import { Link } from 'react-router-dom';

const OrderSummary = () => {
    const { order } = useContext(OrderContext);

    const getTotal = () => {
        return order.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    };

    return (
        <div>
            <h1>Order Summary</h1>
            <ul>
                {order.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price}
                    </li>
                ))}
            </ul>
            <h2>Total: ${getTotal()}</h2>
            <Link to="/payment">
                <button>Proceed to Payment</button>
            </Link>
        </div>
    );
};

export default OrderSummary;
