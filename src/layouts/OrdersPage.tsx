import * as React from 'react';
import { Typography } from '@mui/material';
import RecentOrdersTable from '../components/RecentOrdersTable';
import PageContentWrapper from '../components/PageContentWrapper';
import { useOrderContext } from '../hooks/useOrders';

/**
 * Layout to display overview table of all orders in the system
 */
const OrdersPage = () => {
  const { orders } = useOrderContext();

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