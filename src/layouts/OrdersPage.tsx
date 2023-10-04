import * as React from 'react';
import { Order } from '../types';
import { Link } from 'react-router-dom';
import { Paths } from '../Paths';

interface OrdersProps {
  orders: Order[];
}

const OrdersPage = ({ orders }: OrdersProps) => {
  return (
    <>i am the orders page<br/><Link to={Paths.HOME}>go home</Link></>
  )
}

export default OrdersPage;