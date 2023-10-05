import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './layouts/HomePage';
import OrderPage from './layouts/OrderPage';
import OrdersPage from './layouts/OrdersPage';
import NotFoundPage from './layouts/NotFoundPage';
import { Order } from './types';
import { Paths, STRIDER_PASSTHROUGH_URI } from './constants';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';


function App() {
  const [orderData, setOrderData] = React.useState<Order[]>([]);

  React.useEffect(() => {
    const fetchOrders = async (uri: string) => {
      const orders = await fetch(uri, { method: 'GET', mode: 'cors' });
      const orderJson = await orders.json();
      if (orderJson) {
        setOrderData(orderJson as unknown as Order[])
      } else {
        // handle fetch error
      }
    }

    fetchOrders(STRIDER_PASSTHROUGH_URI);
    // eslint-disable-next-line
  }, []) // no deps array or including orders in dep array causes infinite rerenders 

  const router = createBrowserRouter([
    { path: Paths.HOME,   element: <HomePage orders={orderData} /> },
    { path: Paths.ORDERS, element: <OrdersPage orders={orderData} /> },
    { path: Paths.ORDER,  element: <OrderPage orders={orderData} />  },
    { path: '*',          element: <NotFoundPage /> },
  ])

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
