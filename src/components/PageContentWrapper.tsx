import * as React from 'react';
import { Box } from '@mui/material';
import SideNav from './SideNav';
import Header from './Header';

interface PageContentWrapperProps {
  children: React.ReactNode;
}

/**
 * @param {React.ReactNode} children - The page content to render inside the wrapper 
 * @returns 
 */
const PageContentWrapper = ({children}: PageContentWrapperProps) => {
  return (
    <>
      <SideNav />
      <Header />
      <Box 
        display={'flex'} 
        sx={{ ml: '15vw', mt: '64px', padding: '5vw' }} 
        justifyContent={'center'} 
        boxSizing={'border-box'}
        maxHeight={'calc(100vh - 64px)'}>
        { children }
      </Box>
    </>
  )
}

export default PageContentWrapper;