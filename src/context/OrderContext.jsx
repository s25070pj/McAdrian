import React, { createContext, useReducer, useCallback } from 'react';

const OrderContext = createContext();

const orderReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_ORDER':
            return { ...state, items: [...state.items, action.product] };
        case 'SET_ESTIMATED_TIME':
            return { ...state, estimatedTime: action.time };
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

    const clearOrder = useCallback(() => {
        dispatch({ type: 'CLEAR_ORDER' });
    }, []);

    return (
        <OrderContext.Provider value={{ order, addToOrder, setEstimatedTime, clearOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export { OrderContext, OrderProvider };
