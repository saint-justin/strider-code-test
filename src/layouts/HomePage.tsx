import * as React from 'react';
import SideNav from '../components/SideNav';
import { Box, Typography } from '@mui/material';
import { Order } from '../types';
import PageContentWrapper from '../components/PageContentWrapper';

interface HomePageProps {
  orders: Order[];
}

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