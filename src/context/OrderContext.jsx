import React, { createContext, useReducer, useCallback, useEffect } from 'react';

const OrderContext = createContext();

const orderReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_ORDER':
            return { ...state, items: [...state.items, action.product] };
        case 'REMOVE_FROM_ORDER':
            return { ...state, items: state.items.filter((_, index) => index !== action.index) };
        case 'CLEAR_ORDER':
            return { items: [], estimatedTime: 0 };
        case 'SET_ESTIMATED_TIME':
            return { ...state, estimatedTime: action.time };
        default:
            return state;
    }
};

const calculateEstimatedTime = (items) => {
    if (items.length >= 1 && items.length <= 3) {
        return 3;
    } else if (items.length >= 4 && items.length <= 6) {
        return 6;
    } else if (items.length > 6) {
        return 8;
    } else {
        return 0;
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

    const clearOrder = useCallback(() => {
        dispatch({ type: 'CLEAR_ORDER' });
    }, []);

    useEffect(() => {
        const estimatedTime = calculateEstimatedTime(order.items);
        dispatch({ type: 'SET_ESTIMATED_TIME', time: estimatedTime });
    }, [order.items]);

    return (
        <OrderContext.Provider value={{ order, addToOrder, removeFromOrder, clearOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export { OrderContext, OrderProvider };
