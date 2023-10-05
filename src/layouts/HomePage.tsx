import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Order } from '../types';
import PageContentWrapper from '../components/PageContentWrapper';

interface HomePageProps {
  orders: Order[];
}

/**
 * @param {Order[]} orders - List of order data to pull from for homepage charts 
 * Home page layout including high level graphs for order data and nav tooling
 */
const HomePage = ({ orders }: HomePageProps) => {
  return (
    <PageContentWrapper>
      <Box display={'flex'} width={'100%'} height={'100%'} bgcolor={'red'}>
        <Typography>henlo</Typography>
      </Box>
    </PageContentWrapper>
  )
}

export default HomePage;