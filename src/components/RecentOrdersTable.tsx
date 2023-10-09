import * as React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Order } from '../types';
import { convertOrdersToRows } from '../helpers/data-formatting';
import { useNavigate } from 'react-router-dom';

interface RecentOrdersTableProps {
  orders: Order[];
}

/**
 * @param {Order[]} orders - List of orders to display in the table, displays a loading message if empty. 
 * @returns 
 */
const RecentOrdersTable = ({ orders }: RecentOrdersTableProps) => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'customerName', headerName: 'Name', flex: 1 },
    { field: 'itemCount', headerName: 'Items Sold', flex: 1 },
    { field: 'total', headerName: 'Order Total', flex: 1 },
    { 
      field: 'customerId', 
      headerName: 'Customer Link', 
      flex: 1,
      renderCell: (props) => <Link sx={{ cursor: 'pointer'}} onClick={() => navigate(`/customer/${props.value}`)}>Customer #{props.value}</Link>
    },
    { 
      field: 'id', 
      headerName: 'Order Link', 
      flex: 1, 
      renderCell: (props) => <Link sx={{ cursor: 'pointer'}} onClick={() => navigate(`/order/${props.value}`)}>Order #{props.value}</Link>
    }
  ]

  return (
    <DataGrid 
      sx={{ minWidth: '550px', backgroundColor: 'grey.900'}} 
      rows={convertOrdersToRows(orders)} 
      columns={columns} />    
  )
}

export default RecentOrdersTable;