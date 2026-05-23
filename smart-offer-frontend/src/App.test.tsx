import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Smart Offer System heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Smart Offer System/i);
  expect(headingElement).toBeInTheDocument();
});
