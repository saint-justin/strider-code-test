import * as React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { Paths } from '../constants';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar 
    position={'fixed'} 
    color={'primary'} 
    sx={{ height: '4em', width: `calc(100% - 15vw)`, ml: `15vw` }} >
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} >
      <Box 
        onClick={() => navigate(Paths.HOME)}
        display={'flex'}
        alignSelf={'center'}
        sx={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          cursor: 'pointer', 
          gap: '12px'
        }}>
        <Typography variant={'h4'}>Strider General Store</Typography>
      </Box>

      <ThemeToggle />
    </Toolbar>
  </AppBar>
  )
}

export default Header;