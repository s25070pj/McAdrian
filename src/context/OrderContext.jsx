import React, { createContext, useReducer, useCallback } from 'react';

const OrderContext = createContext();

const orderReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_ORDER':
            return [...state, action.product];
        default:
            return state;
    }
};

const OrderProvider = ({ children }) => {
    const [order, dispatch] = useReducer(orderReducer, []);

    const addToOrder = useCallback((product) => {
        dispatch({ type: 'ADD_TO_ORDER', product });
    }, []);

    return (
        <OrderContext.Provider value={{ order, addToOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export { OrderContext, OrderProvider };
