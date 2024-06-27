import React from 'react';
import categoriesData from '../data/categories.json';

const Navigation = ({ setSelectedCategory }) => (
    <nav>
        <ul className="space-y-4">
            {categoriesData.map((category, index) => (
                <li
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer border p-2 rounded mb-2"
                    onClick={() => setSelectedCategory(category.name === 'All' ? '' : category.name.toLowerCase())}
                >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                </li>
            ))}
        </ul>
    </nav>
);

export default Navigation;
