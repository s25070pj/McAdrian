import React from 'react';
import Product from './Product';
import useFetch from '../hooks/useFetch';

const Menu = ({ selectedCategory }) => {
    const { data: menu, loading } = useFetch('http://localhost:8080/api/menu');

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredMenu = selectedCategory
        ? menu.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase())
        : menu;

    const sortedMenu = filteredMenu.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="flex">
            <div className="w-3/4">
                <h1 className="text-2xl font-bold mb-4">All Time Favourites</h1>
                <div className="grid grid-cols-3 gap-4">
                    {sortedMenu.map((item) => (
                        <Product key={item.id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Menu;
