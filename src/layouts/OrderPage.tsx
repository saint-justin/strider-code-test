import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Order } from '../types';
import PageContentWrapper from '../components/PageContentWrapper';

interface OrderPageProps {
  orders: Order[];
}

/**
 * @param {Order[]} orders - List of order data so we can select and display the requested order from the list 
 * Order page layout to show details on a single order based on the passed ID in the path/url
 */
const OrderPage = ({ orders }: OrderPageProps) => {
  const { id } = useParams<{ id: string }>();

  return (
    <PageContentWrapper>
      <Typography variant='body1'>
        hi im the individual order page for order { id }.
      </Typography>
    </PageContentWrapper>
  )
}

export default OrderPage;