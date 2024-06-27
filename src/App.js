import React, { useState } from 'react';
import Menu from './components/Menu';
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
                    <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" className="w-full h-auto object-cover" />
                </header>
                <div className="flex flex-1">
                    <aside className="w-1/5 bg-gray-100 p-4">
                        <Navigation setSelectedCategory={setSelectedCategory} />
                    </aside>
                    <main className="w-3/5 p-4">
                        <Menu selectedCategory={selectedCategory} />
                    </main>
                    <div className="w-1/5 p-4">
                        <Cart />
                    </div>
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
