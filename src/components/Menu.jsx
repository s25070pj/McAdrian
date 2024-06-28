import React, { useMemo } from 'react';
import Product from './Product';
import useFetch from '../hooks/useFetch';

const Menu = ({ selectedCategory }) => {
    const { data: menu, loading, error } = useFetch('http://localhost:8080/api/menu');

    const filteredMenu = useMemo(() => {
        if (!menu) return [];
        if (!selectedCategory) return menu;
        return menu.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
    }, [menu, selectedCategory]);

    const sortedMenu = useMemo(() => {
        return filteredMenu.sort((a, b) => a.name.localeCompare(b.name));
    }, [filteredMenu]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
