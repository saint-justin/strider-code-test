import * as React from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, Receipt, People, ShoppingCart } from '@mui/icons-material';
import { Paths } from '../constants';

interface ListItemData {
  text: string,
  path: string,
  icon: JSX.Element,
}

/**
 * Navigational component displaying links to the different pages users can navigate to
 */
const SideNav = () => {
  const navigate = useNavigate();

  const listItemData: ListItemData[] = [
    { text:'Home', path: Paths.HOME, icon: <Home />},
    { text:'Orders', path: Paths.ORDERS, icon: <Receipt /> },
    { text:'Customers', path: Paths.CUSTOMERS, icon: <People /> },
    { text:'Items', path: Paths.ITEMS, icon: <ShoppingCart /> },
  ];

  const generateListItems = (items: ListItemData[]) => items.map(({icon, text, path}: ListItemData, index: number) => (
    <ListItem key={`navbar_li_${index}`} disablePadding>
      <ListItemButton onClick={() => navigate(path)} sx={{ gap: 2 }}>
        {icon}
        <ListItemText primary={text}/>
      </ListItemButton>
    </ListItem>
  ))

  return (
    <Box sx={{ display: 'flex'}}>
      <Drawer sx={{
        width: '15vw',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: '15vw',
          boxSizing: 'border-box',
        }
      }}
      variant='permanent'
      anchor='left'>
        <Toolbar /> {/* spacing */}
        <Divider />
        <List>
          { generateListItems(listItemData)}
        </List>
      </Drawer>
      
    </Box>
  )
}

export default SideNav;