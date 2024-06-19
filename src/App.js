import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import OrderSummary from './components/OrderSummary';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';
import Navigation from './components/Navigation';
import { OrderProvider } from './context/OrderContext';

function App() {
    return (
        <OrderProvider>
            <div className="App">
                <Navigation />
                <Routes>
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/order-summary" element={<OrderSummary />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route path="/" element={<Menu />} />
                </Routes>
            </div>
        </OrderProvider>
    );
}

export default App;
