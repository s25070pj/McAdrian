import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import OrderSummary from './components/OrderSummary';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';
import Navigation from './components/Navigation';
import { OrderProvider } from './context/OrderContext';
import './App.css';

function App() {
    const [selectedCategory, setSelectedCategory] = useState('');

    return (
        <OrderProvider>
            <div className="App">
                <header className="bg-yellow-500 p-4">
                    <img src="/path/to/logo.png" alt="Logo" className="mx-auto" />
                </header>
                <div className="flex">
                    <aside className="w-1/5 bg-gray-100 p-4">
                        <Navigation setSelectedCategory={setSelectedCategory} />
                    </aside>
                    <main className="w-4/5 p-4">
                        <Routes>
                            <Route path="/" element={<Menu selectedCategory={selectedCategory} />} />
                            <Route path="/order-summary" element={<OrderSummary />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/confirmation" element={<Confirmation />} />
                        </Routes>
                    </main>
                </div>
                <footer className="p-4">
                    <button className="bg-red-500 text-white p-2 rounded-lg mx-auto block">
                        Cancel Order
                    </button>
                </footer>
            </div>
        </OrderProvider>
    );
}

export default App;
