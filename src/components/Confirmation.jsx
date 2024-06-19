import React from 'react';
import { Link } from 'react-router-dom';

const Confirmation = () => {
    return (
        <div>
            <h1>Order Confirmation</h1>
            <p>Thank you for your order! Your order has been placed successfully.</p>
            <Link to="/menu">
                <button>Back to Menu</button>
            </Link>
        </div>
    );
};

export default Confirmation;
