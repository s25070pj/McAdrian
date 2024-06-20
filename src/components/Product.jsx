import React, { useContext, useState } from 'react';
import { OrderContext } from '../context/OrderContext';

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
        <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
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
