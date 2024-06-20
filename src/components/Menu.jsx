import React, { useState, useEffect, useMemo } from 'react';
import Product from './Product';
import menuData from '../data/menu.json';

const Menu = ({ selectedCategory }) => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        setMenu(menuData);
    }, []);

    const filteredMenu = useMemo(() => {
        if (!selectedCategory) return menu;
        return menu.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
    }, [menu, selectedCategory]);

    const sortedMenu = useMemo(() => {
        return filteredMenu.sort((a, b) => a.name.localeCompare(b.name));
    }, [filteredMenu]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">All Time Favourites</h1>
            <div className="grid grid-cols-3 gap-4">
                {sortedMenu.map((item) => (
                    <Product key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
};

export default Menu;
