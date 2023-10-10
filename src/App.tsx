import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useOrderContext } from './hooks/useOrders';
import { useThemeContext } from './hooks/useThemeContext';
import { Paths, STRIDER_PASSTHROUGH_URI } from './constants';
import { Order } from './types';
import CustomerPage from './layouts/CustomerPage';
import CustomersPage from './layouts/CustomersPage';
import ItemPage from './layouts/ItemPage';
import ItemsPage from './layouts/ItemsPage';
import HomePage from './layouts/HomePage';
import OrderPage from './layouts/OrderPage';
import OrdersPage from './layouts/OrdersPage';
import NotFoundPage from './layouts/NotFoundPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';



function App() {
  const { theme } = useThemeContext();
  const { setOrders } = useOrderContext();

  // Fetch data on first load
  React.useEffect(() => {
    const fetchOrders = async (uri: string) => {
      const orders = await fetch(uri, { method: 'GET', mode: 'cors' });
      const orderJson = await orders.json();
      if (orderJson) {
        setOrders(orderJson as unknown as Order[])
      } else {
        // handle fetch error
      }
    }

    fetchOrders(STRIDER_PASSTHROUGH_URI);
  }, []) // eslint-disable-line

  const router = createBrowserRouter([
    { path: Paths.HOME,      element: <HomePage /> },
    { path: Paths.ORDERS,    element: <OrdersPage /> },
    { path: Paths.ORDER,     element: <OrderPage /> },
    { path: Paths.CUSTOMER,  element: <CustomerPage /> },
    { path: Paths.CUSTOMERS, element: <CustomersPage /> },
    { path: Paths.ITEM,      element: <ItemPage /> },
    { path: Paths.ITEMS,     element: <ItemsPage /> },
    { path: '*',             element: <NotFoundPage /> },
  ])

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
