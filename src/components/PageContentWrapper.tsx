import * as React from 'react';
import SideNav from './SideNav';
import { Box } from '@mui/material';

interface PageContentWrapperProps {
  children: React.ReactNode;
}


const PageContentWrapper = ({children}: PageContentWrapperProps) => {
  return (
    <>
      <SideNav />
      <Box display={'flex'} sx={{ ml: '15vw', padding: '5vw' }} justifyContent={'center'}>
        {children}
      </Box>
    </>
  )
}

export default PageContentWrapper;