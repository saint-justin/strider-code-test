import * as React from 'react';
import SideNav from './SideNav';
import { Box } from '@mui/material';

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
      <Box display={'flex'} sx={{ ml: '15vw', padding: '5vw' }} justifyContent={'center'}>
        {children}
      </Box>
    </>
  )
}

export default PageContentWrapper;