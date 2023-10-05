import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Order } from '../types';
import { convertOrdersToRows } from '../helpers/data-formatting';

interface RecentOrdersTableProps {
  orders: Order[];
}

// DataGrid column definitions
const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'customerName', headerName: 'Name', flex: 1 },
  { field: 'itemCount', headerName: 'Items Sold', flex: 1 },
  { field: 'total', headerName: 'Order Total', flex: 1 },
]

/**
 * @param {Order[]} orders - List of orders to display in the table, displays a loading message if empty. 
 * @returns 
 */
const RecentOrdersTable = ({ orders }: RecentOrdersTableProps) => {
  return (
    <Box sx={{ width: '70%' }}>
      <Typography variant={'h5'} ml={'12px'}>Recent Orders</Typography>
      <DataGrid 
        sx={{ minWidth: '550px'}} 
        rows={convertOrdersToRows(orders)} 
        columns={columns} />
    </Box>
  )
}

export default RecentOrdersTable;