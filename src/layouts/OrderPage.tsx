import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import SideNav from '../components/SideNav';
import { Order } from '../types';
import RecentOrdersTable from '../components/RecentOrdersTable';
import PageContentWrapper from '../components/PageContentWrapper';

interface OrderPageProps {
  orders: Order[];
}

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