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
            <p>Preparation time: {product.preparationTime} minutes</p>
            <div>
                <h3>Ingredients</h3>
                <ul>
                    {product.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Allergens</h3>
                <ul>
                    {product.allergens.map((allergen, index) => (
                        <li key={index}>{allergen}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Nutrition Facts</h3>
                <p>Calories: {product.nutrition.calories}</p>
                <p>Protein: {product.nutrition.protein}g</p>
                <p>Fat: {product.nutrition.fat}g</p>
                <p>Carbs: {product.nutrition.carbs}g</p>
            </div>
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
