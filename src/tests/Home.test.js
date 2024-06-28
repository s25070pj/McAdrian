import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';

test('renders home component and allows order type selection', () => {
    render(
        <Router>
            <Home />
        </Router>
    );

    // Check if the buttons are present
    const dineInButton = screen.getByText(/Dine In/i);
    const takeawayButton = screen.getByText(/Takeaway/i);

    expect(dineInButton).toBeInTheDocument();
    expect(takeawayButton).toBeInTheDocument();

    // Simulate button click
    fireEvent.click(dineInButton);
    expect(localStorage.getItem('orderType')).toBe('dine-in');

    fireEvent.click(takeawayButton);
    expect(localStorage.getItem('orderType')).toBe('takeaway');
});
