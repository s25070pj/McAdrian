import React, { useContext, useState } from 'react';
import { OrderContext } from '../context/OrderContext';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Product = ({ product }) => {
    const { addToOrder } = useContext(OrderContext);
    const [selectedExtras, setSelectedExtras] = useState([]);

    const handleExtraChange = (extra, isChecked) => {
        if (isChecked) {
            setSelectedExtras([...selectedExtras, extra]);
        } else {
            setSelectedExtras(selectedExtras.filter((e) => e.name !== extra.name));
        }
    };

    const handleAddToOrder = () => {
        const productWithExtras = {
            ...product,
            extras: selectedExtras,
        };
        addToOrder(productWithExtras);
    };

    const isBreakfastTime = () => {
        const now = new Date();
        const hours = now.getHours();
        return hours >= 5 && hours < 11;
    };

    return (
        <div className="border p-4 rounded-lg shadow-lg">
            <img src={`/images/${product.id}.png`} alt={product.name} className="object-cover mb-2 fixed-dimensions" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold">PLN {product.price.toFixed(2)}</p>
            {product.allergens && product.allergens.length > 0 && (
                <div>
                    <span data-tooltip-id={`allergen-${product.id}`} style={{ cursor: 'pointer' }}>
                        <img src="/images/icon.png" alt="Allergens" className="alergens" />
                    </span>
                    <Tooltip id={`allergen-${product.id}`} place="top" effect="solid">
                        <h3>Allergens</h3>
                        <ul>
                            {product.allergens.map((allergen, index) => (
                                <li key={index}>{allergen}</li>
                            ))}
                        </ul>
                    </Tooltip>
                </div>
            )}

            {product.extras && (
                <div>
                    <h3>Extras</h3>
                    {product.extras.map((extra, index) => (
                        <div key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleExtraChange(extra, e.target.checked)}
                                />
                                {extra.name} (+PLN {extra.price.toFixed(2)})
                            </label>
                        </div>
                    ))}
                </div>
            )}
            {(product.category.toLowerCase() !== 'breakfast' || isBreakfastTime()) ? (
                <button className="bg-blue-500 text-white p-2 rounded-lg mt-2" onClick={handleAddToOrder}>
                    Add to Order
                </button>
            ) : (
                <button className="bg-red-500 text-gray p-2 rounded-lg mt-2" >
                    Breakfast available from 5:00 to 11:00
                </button>
            )}

        </div>
    );
};

export default Product;
