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
        <div className="product">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Preparation time: {product.preparationTime} minutes</p>

            {product.allergens && product.allergens.length > 0 && (
                <div>
          <span data-tooltip-id={`allergen-${product.id}`} style={{ cursor: 'pointer' }}>
            <img src="/path/to/icon.png" alt="Allergens" />
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
            <button onClick={handleAddToOrder}>Add to Order</button>
        </div>
    );
};

export default Product;
