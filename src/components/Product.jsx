import React, { useContext, useState } from 'react';
import { OrderContext } from '../context/OrderContext';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; // Upewnij się, że importujesz styl dla dymków

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

    return (
        <div className="border p-4 rounded-lg shadow-lg">
            <img src={`/path/to/images/${product.id}.png`} alt={product.name} className="w-full h-32 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold">RM {product.price}</p>
            <p>Preparation time: {product.preparationTime} minutes</p>

            {product.allergens && product.allergens.length > 0 && (
                <div>
          <span data-tooltip-id={`allergen-${product.id}`} style={{ cursor: 'pointer' }}>
            <img src="/path/to/icon.png" alt="Allergens" className="w-6 h-6 inline" />
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
                                {extra.name} (+${extra.price})
                            </label>
                        </div>
                    ))}
                </div>
            )}
            <button className="bg-blue-500 text-white p-2 rounded-lg mt-2" onClick={handleAddToOrder}>
                Add to Order
            </button>
        </div>
    );
};

export default Product;
