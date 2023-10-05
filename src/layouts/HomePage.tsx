import * as React from 'react';
import SideNav from '../components/SideNav';
import { Box, Typography } from '@mui/material';
import { Order } from '../types';

interface HomePageProps {
  orders: Order[];
}

const HomePage = ({ orders }: HomePageProps) => {
  return (
    <>
      <SideNav />
      <Box display={'flex'} sx={{ ml: '15vw', padding: '5vw' }} justifyContent={'center'}>
        <Box display={'flex'} width={'100%'} height={'100%'} bgcolor={'red'}>
          <Typography>henlo</Typography>
        </Box>
      </Box>
    </>
  )
}

export default HomePage;