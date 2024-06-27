import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import Navigation from './components/Navigation';
import Cart from './components/Cart';
import OrderSummary from './components/OrderSummary';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';
import { OrderProvider } from './context/OrderContext';
import './App.css';

function App() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const location = useLocation();

    const isOrderSummaryPage = location.pathname === '/order-summary';

    return (
        <OrderProvider>
            <div className="App flex flex-col min-h-screen">
                <header className="bg-yellow-500 p-4">
                    <img src="/images/logo.png" alt="Logo" className="mx-auto" />
                </header>
                <div className={`flex flex-1 ${isOrderSummaryPage ? 'flex-col' : ''}`}>
                    {!isOrderSummaryPage && (
                        <aside className="w-1/5 bg-gray-100 p-4">
                            <Navigation setSelectedCategory={setSelectedCategory} />
                        </aside>
                    )}
                    <main className={`${isOrderSummaryPage ? 'w-full' : 'w-3/5'} p-4`}>
                        <Routes>
                            <Route path="/" element={<Menu selectedCategory={selectedCategory} />} />
                            <Route path="/order-summary" element={<OrderSummary />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/confirmation" element={<Confirmation />} />
                        </Routes>
                    </main>
                    {!isOrderSummaryPage && (
                        <div className="w-1/5 p-4">
                            <Cart />
                        </div>
                    )}
                </div>
                {!isOrderSummaryPage && (
                    <footer className="p-4">
                        <button className="bg-red-500 text-white p-2 rounded-lg mx-auto block">
                            Cancel Order
                        </button>
                    </footer>
                )}
            </div>
        </OrderProvider>
    );
}

export default App;
