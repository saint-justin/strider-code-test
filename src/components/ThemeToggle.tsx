import * as React from 'react';
import { useThemeContext } from '../hooks/useThemeContext';
import { Box } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const ThemeToggle = () => {
  const { mode, toggle } = useThemeContext(); 

  return (
    <Box display={'flex'} sx={{ cursor: 'pointer' }} onClick={toggle}>
      {
        mode === 'light' 
        ? <LightModeIcon sx={{ fontSize: '2rem' }} />
        : <DarkModeIcon sx={{ fontSize: '2rem' }} />
      }
    </Box>
  )
}

export default ThemeToggle;