import React, { useState, useEffect, useMemo } from 'react';
import Product from './Product';
import menuData from '../data/menu.json';

const Menu = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        setMenu(menuData);
    }, []);

    const sortedMenu = useMemo(() => {
        return menu.sort((a, b) => a.name.localeCompare(b.name));
    }, [menu]);

    return (
        <div>
            <h1>Menu</h1>
            <div>
                {sortedMenu.map((item) => (
                    <Product key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
};

export default Menu;
