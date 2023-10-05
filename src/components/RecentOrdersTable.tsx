import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Order } from '../types';

interface RecentOrdersTableProps {
  orders: Order[];
}

interface FormattedOrder {
  id: number; 
  date: string; 
  customerName: string; 
  itemCount: number; 
  total: string;
}

// DataGrid column definitions
const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'customerName', headerName: 'Name', flex: 1 },
  { field: 'itemCount', headerName: 'Items Sold', flex: 1 },
  { field: 'total', headerName: 'Order Total', flex: 1 },
]

// Standardize cost format to $X.XX
const reformatCost = (cost: string): string => `$${parseFloat(cost.slice(1)).toFixed(2)}`;

const convertOrdersToRows = (orders: Order[]) => {
  // Reformat to datagrid formatted order then default sort by date (new -> old)
  return orders
    .map((order, index) => ({
      id: index,
      date: new Date(order.Date).toLocaleDateString(),
      customerName: order.CustomerName,
      itemCount: order.Items.length,
      total: reformatCost(order.Total),
    }))
    .sort((a: FormattedOrder, b: FormattedOrder) => 
      new Date(b.date).valueOf() - new Date(a.date).valueOf()
    );
}

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