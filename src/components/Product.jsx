import React, { useContext, useRef, useLayoutEffect } from 'react';
import { OrderContext } from '../context/OrderContext';

const Product = ({ product }) => {
    const { addToOrder } = useContext(OrderContext);
    const productRef = useRef();

    useLayoutEffect(() => {
        console.log('Product component mounted or updated');
    }, []);

    return (
        <div ref={productRef}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToOrder(product)}>Add to Order</button>
        </div>
    );
};

export default Product;
