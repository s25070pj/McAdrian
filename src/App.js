import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
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

    const isSpecialPage = ['/', '/order-summary', '/payment', '/confirmation'].includes(location.pathname);



    return (
        <OrderProvider>
            <div className="App flex flex-col min-h-screen">
                <header className="bg-yellow-500 p-4">
                    <img src="/images/logo.png" alt="Logo" />
                </header>
                <div className={`flex flex-1 ${isSpecialPage ? 'fullscreen-content' : ''}`}>
                    {!isSpecialPage && (
                        <aside className="w-1/5 bg-gray-100 p-4">
                            <Navigation setSelectedCategory={setSelectedCategory} />
                        </aside>
                    )}
                    <main className={`${isSpecialPage ? 'w-full max-w-3xl content-wrapper' : 'w-3/5 p-4'}`}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/menu" element={<Menu selectedCategory={selectedCategory} />} />
                            <Route path="/order-summary" element={<OrderSummary />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/confirmation" element={<Confirmation />} />
                        </Routes>
                    </main>
                    {!isSpecialPage && (
                        <div className="w-1/5 p-4">
                            <Cart />
                        </div>
                    )}
                </div>
            </div>
        </OrderProvider>
    );
}

export default App;
