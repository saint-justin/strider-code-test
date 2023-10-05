import * as React from 'react';
import { Order } from '../types';
import { Link } from 'react-router-dom';
import { Paths } from '../constants';
import { Typography } from '@mui/material';
import SideNav from '../components/SideNav';

interface OrdersProps {
  orders: Order[];
}

const OrdersPage = ({ orders }: OrdersProps) => {
  return (
    <>
      <SideNav />
      <Typography variant='body1'>
        i am the orders page<Link to={Paths.HOME}>go home</Link>
      </Typography>
    </>
  )
}

export default OrdersPage;