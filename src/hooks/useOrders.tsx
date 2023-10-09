import { createContext, useState, useContext, Dispatch, SetStateAction } from 'react';
import { Order } from '../types';

interface OrderContextProviderProps {
  children: React.ReactNode;
}

interface OrderContextProps {
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
}

/**
 * Dummy hook so orders and setOrders can be named isntead of being locked into a tuple.
 * @returns { Order[] }                           orders    - List of current orders
 * @returns { Dispatch<SetStateAction<Order[]>> } setOrders - Update order state
 */
const useOrders = (): OrderContextProps => {
  const [orders, setOrders] = useState<Order[]>([]);
  return { orders, setOrders };
}

/**
 * Instantiated context to pass to OrderContextProvider
 */
const OrderContext = createContext<OrderContextProps>({
  orders: [],
  setOrders: () => {},
});

/**
 * @param { React.ReactNode } children - The children to render inside the OrderContextProvider
 * @returns { React.FC }               - Externally accessible OrderContextProvider wrapper
 */
export const OrderContextProvider = ({ children }: OrderContextProviderProps) => {
  const orders = useOrders();
  return <OrderContext.Provider value={orders}>{children}</OrderContext.Provider>
}

/**
 * @returns { OrderContextProps } - Externally accessible OrderContext instance
 */
export const useOrderContext = () => {
  return useContext(OrderContext);
}