import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeContextProvider } from './hooks/useThemeContext';
import { OrderContextProvider } from './hooks/useOrders';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <OrderContextProvider>
        <App />
      </OrderContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
