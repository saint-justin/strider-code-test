import * as React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import RecentOrdersTable from '../components/RecentOrdersTable';
import PageContentWrapper from '../components/PageContentWrapper';
import { useOrderContext } from '../hooks/useOrders';
import LabeledContent from '../components/LabeledContent';

/**
 * Layout to display overview table of all orders in the system
 */
const OrdersPage = () => {
  const { orders } = useOrderContext();

  return (
    <PageContentWrapper>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
        <Typography variant={'h5'} ml={'12px'} mb={1}>Recent Orders</Typography>
        {
          orders.length > 0 
          ? <RecentOrdersTable orders={orders} /> 
          : 'loading...'
        }
      </Box>

    </PageContentWrapper>
  )
}

export default OrdersPage;