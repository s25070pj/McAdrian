import React, { createContext, useReducer, useCallback } from 'react';

const OrderContext = createContext();

const orderReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_ORDER':
            return { ...state, items: [...state.items, action.product] };
        case 'SET_ESTIMATED_TIME':
            return { ...state, estimatedTime: action.time };
        case 'REMOVE_FROM_ORDER':
            return { ...state, items: state.items.filter((_, index) => index !== action.index) };
        case 'CLEAR_ORDER':
            return { ...state, items: [], estimatedTime: 0 };
        default:
            return state;
    }
};

const OrderProvider = ({ children }) => {
    const [order, dispatch] = useReducer(orderReducer, { items: [], estimatedTime: 0 });

    const addToOrder = useCallback((product) => {
        dispatch({ type: 'ADD_TO_ORDER', product });
    }, []);

    const setEstimatedTime = useCallback((time) => {
        dispatch({ type: 'SET_ESTIMATED_TIME', time });
    }, []);

    const removeFromOrder = useCallback((index) => {
        dispatch({ type: 'REMOVE_FROM_ORDER', index });
    }, []);

    const clearOrder = useCallback(() => {
        dispatch({ type: 'CLEAR_ORDER' });
    }, []);

    return (
        <OrderContext.Provider value={{ order, addToOrder, setEstimatedTime, removeFromOrder, clearOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export { OrderContext, OrderProvider };
