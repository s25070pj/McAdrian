import React, { useContext, useEffect } from 'react';
import { OrderContext } from '../context/OrderContext';

const OrderSummary = () => {
    const { order, setEstimatedTime } = useContext(OrderContext);

    useEffect(() => {
        const estimatedTime = order.items.reduce((totalTime, item) => totalTime + item.preparationTime, 0);
        setEstimatedTime(estimatedTime);
    }, [order.items, setEstimatedTime]);

    const getTotal = () => {
        return order.items.reduce((sum, item) => {
            const extrasTotal = item.extras ? item.extras.reduce((extraSum, extra) => extraSum + extra.price, 0) : 0;
            return sum + item.price + extrasTotal;
        }, 0).toFixed(2);
    };

    return (
        <div>
            <h1>Order Summary</h1>
            <ul>
                {order.items.map((item, index) => (
                    <li key={index}>
                        {item.name} - PLN {item.price.toFixed(2)}
                        {item.extras && item.extras.length > 0 && (
                            <ul>
                                {item.extras.map((extra, extraIndex) => (
                                    <li key={extraIndex}>
                                        {extra.name} (+PLN {extra.price.toFixed(2)})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
            <h2>Total: PLN {getTotal()}</h2>
            <h3>Estimated wait time: {order.estimatedTime} minutes</h3>
            <button>Proceed to Payment</button>
        </div>
    );
};

export default OrderSummary;
