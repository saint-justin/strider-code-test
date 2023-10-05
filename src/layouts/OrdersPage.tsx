import * as React from 'react';
import { Order } from '../types';
import { Typography } from '@mui/material';
import RecentOrdersTable from '../components/RecentOrdersTable';
import PageContentWrapper from '../components/PageContentWrapper';

interface OrdersProps {
  orders: Order[];
}

/**
 * 
 * @param {Order[]} orders - List of orders to display in the table
 * Layout to display overview table of all orders in the system
 */
const OrdersPage = ({ orders }: OrdersProps) => {
  return (
    <PageContentWrapper>
      <Typography variant='body1'>
      {
            orders.length > 0 
            ? <RecentOrdersTable orders={orders} /> 
            : 'loading...'
          }
      </Typography>
    </PageContentWrapper>
  )
}

export default OrdersPage;