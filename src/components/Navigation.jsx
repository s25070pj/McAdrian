import React from 'react';
import useFetch from '../hooks/useFetch';

const Navigation = ({ setSelectedCategory }) => {
    const { data: categories, loading } = useFetch('http://localhost:8080/api/categories');

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <nav>
            <ul className="space-y-4">
                {categories.map((category, index) => (
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
};

export default Navigation;
