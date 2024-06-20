import React from 'react';

const categories = [
    { name: 'All', icon: '🍔' },
    { name: 'Burgers', icon: '🍔' },
    { name: 'Drinks', icon: '🥤' },
    { name: 'Sides', icon: '🍟' },
    { name: 'Desserts', icon: '🍦' }
];

const Navigation = ({ setSelectedCategory }) => (
    <nav>
        <ul className="space-y-4">
            {categories.map((category, index) => (
                <li
                    key={index}
                    className="flex items-center space-x-2 cursor-pointer"
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
