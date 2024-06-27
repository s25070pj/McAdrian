import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import OrderSummary from './components/OrderSummary';
import Payment from './components/Payment';
import Confirmation from './components/Confirmation';
import Navigation from './components/Navigation';
import Cart from './components/Cart';
import { OrderProvider } from './context/OrderContext';
import './App.css';

function App() {
    const [selectedCategory, setSelectedCategory] = useState('');

    return (
        <OrderProvider>
            <div className="App flex flex-col min-h-screen">
                <header className="bg-yellow-500 p-4">
                    <img src="/images/logo.png" alt="Logo" className="mx-auto" />
                </header>
                <div className="flex flex-1">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <aside className="w-1/5 bg-gray-100 p-4">
                                    <Navigation setSelectedCategory={setSelectedCategory} />
                                </aside>
                                <main className="w-3/5 p-4">
                                    <Menu selectedCategory={selectedCategory} />
                                </main>
                                <div className="w-1/5 p-4">
                                    <Cart />
                                </div>
                            </>
                        } />
                        <Route path="/order-summary" element={
                            <main className="w-full p-4">
                                <OrderSummary />
                            </main>
                        } />
                        <Route path="/payment" element={
                            <main className="w-full p-4">
                                <Payment />
                            </main>
                        } />
                        <Route path="/confirmation" element={
                            <main className="w-full p-4">
                                <Confirmation />
                            </main>
                        } />
                    </Routes>
                </div>
                <footer className="p-4">
                    <button className="bg-red-500 text-white p-2 rounded-lg mx-auto block">
                        tu nic nie ma
                    </button>
                </footer>
            </div>
        </OrderProvider>
    );
}

export default App;
