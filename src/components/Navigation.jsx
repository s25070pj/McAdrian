import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
    <nav>
        <ul>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/order-summary">Order Summary</Link></li>
            <li><Link to="/payment">Payment</Link></li>
        </ul>
    </nav>
);

export default Navigation;
