import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { convertOrdersToRows } from '../../helpers/data-formatting';
import { useOrderContext } from '../../hooks/useOrders';

const WidgetRecentCustomers = () => {
  const navigate = useNavigate();
  const { orders } = useOrderContext();

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'customerName', headerName: 'Customer', flex: 1 },
    { field: 'itemCount', headerName: 'Items Purchased', flex: 1 },
    { field: 'total', headerName: 'Total Orders', flex: 1 },
    { 
      field: 'customerId',
      headerName: 'Customer Link',
      flex: 1,
      renderCell: (props) => (
        <Link sx={{ cursor: 'pointer'}} onClick={() => navigate(`/customer/${props.value}`)}>Customer #{props.value}</Link>
      )
    }
  ]

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant={'h5'} ml={'12px'} mb={1}>Recent Customers</Typography>
        <DataGrid 
          sx={{ minWidth: '550px', backgroundColor: 'grey.900'}} 
          rows={convertOrdersToRows(orders)} 
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 3 }} }}
          pageSizeOptions={[3]} />
      </CardContent>
    </Card>

  )
}

export default WidgetRecentCustomers