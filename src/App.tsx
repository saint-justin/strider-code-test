import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './layouts/HomePage';
import OrderPage from './layouts/OrderPage';
import OrdersPage from './layouts/OrdersPage';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { Order } from './types';
import { Paths } from './Paths';

const striderProxyUri = 'https://us-central1-strider-passthrough.cloudfunctions.net/api'

function App() {
  const [orderData, setOrderData] = React.useState<Order[]>([]);
  React.useEffect(() => {
    const fetchOrders = async (uri: string) => {
      const orders = await fetch(uri, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });

      const orderJson = await orders.json();
      if (orderJson) {
        setOrderData(orderJson as unknown as Order[])
      };
    }

    fetchOrders(striderProxyUri);
  }, []) 

  const router = createBrowserRouter([
    {
      path: Paths.HOME,
      element: <HomePage />
    },
    {
      path: Paths.ORDERS,
      element: <OrdersPage orders={orderData} />
    },
    {
      path: Paths.ORDER,
      element: <OrderPage />,
    }
  ])

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
