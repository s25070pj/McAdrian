import React, { createContext, useReducer, useCallback } from 'react';

const OrderContext = createContext();

const orderReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_ORDER':
            return { ...state, items: [...state.items, action.product] };
        case 'REMOVE_FROM_ORDER':
            return { ...state, items: state.items.filter((_, index) => index !== action.index) };
        case 'SET_ESTIMATED_TIME':
            return { ...state, estimatedTime: action.time };
        default:
            return state;
    }
};

const OrderProvider = ({ children }) => {
    const [order, dispatch] = useReducer(orderReducer, { items: [], estimatedTime: 0 });

    const addToOrder = useCallback((product) => {
        dispatch({ type: 'ADD_TO_ORDER', product });
    }, []);

    const removeFromOrder = useCallback((index) => {
        dispatch({ type: 'REMOVE_FROM_ORDER', index });
    }, []);

    const setEstimatedTime = useCallback((time) => {
        dispatch({ type: 'SET_ESTIMATED_TIME', time });
    }, []);

    return (
        <OrderContext.Provider value={{ order, addToOrder, removeFromOrder, setEstimatedTime }}>
            {children}
        </OrderContext.Provider>
    );
};

export { OrderContext, OrderProvider };
