import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import SideNav from '../components/SideNav';
import { Order } from '../types';
import RecentOrders from '../components/RecentOrders';

interface OrderPageProps {
  orders: Order[];
}

const OrderPage = ({orders}: OrderPageProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <SideNav />
      <Typography variant='body1'>
        {
            orders.length > 0 
            ? <RecentOrders orders={orders} /> 
            : 'loading...'
          }
      </Typography>
    </>
  )
}

export default OrderPage;