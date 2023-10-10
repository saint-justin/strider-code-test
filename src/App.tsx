import React, { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Alert, CssBaseline, Snackbar, ThemeProvider } from '@mui/material';
import { useOrderContext } from './hooks/useOrders';
import { useThemeContext } from './hooks/useThemeContext';
import { MAX_API_RETRIES, Paths, STRIDER_PASSTHROUGH_URI } from './constants';
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
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  // Fetch data on first load
  useEffect(() => {
    // Usually I'd use some sort of exponential backoff retry logic but not worth it for this project
    const fetchOrders = async (uri: string) => {
      let retryCount = 0;
      while (retryCount < MAX_API_RETRIES) {
        try {
          const orders = await fetch(uri, { method: 'GET', mode: 'cors' });
          const orderJson = await orders.json();
          if (!!orderJson) {
            setOrders(orderJson as unknown as Order[])
          }
          return;
        } catch (error) {
          let message = 'Unknown Error';
          if (error instanceof Error) message = error.message;
          retryCount += 1;
          setShowError(true);
          setErrorMessage(message);
          console.log('Retry #' + retryCount + ' failed. Trying again...');
        }
      }
      setShowError(true);
      setErrorMessage('Maximum API Request Retries Exceeded. Check your internet connection before trying again.')
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
        <Snackbar
          open={showError}
          autoHideDuration={6000}
          onClose={() => setShowError(false)}
        >
          <Alert severity='error'>{errorMessage}</Alert> 
        </Snackbar>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
