import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { convertOrdersToCustomerRows } from '../../helpers/data-formatting';
import { useOrderContext } from '../../hooks/useOrders';

const WidgetRecentCustomers = () => {
  const navigate = useNavigate();
  const { orders } = useOrderContext();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Customer', flex: 1 },
    { field: 'totalOrderSpending', headerName: 'Total Spending', flex: 1 },
    { 
      field: 'id',
      headerName: 'Customer Link',
      flex: 1,
      renderCell: (props) => (
        <Link sx={{ cursor: 'pointer'}} onClick={() => navigate(`/customers/${props.value}`)}>Customer #{props.value}</Link>
      )
    }
  ]

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant={'h5'} ml={'12px'} mb={1}>Recent Customers</Typography>
        <DataGrid 
          sx={{ backgroundColor: 'grey.900'}} 
          rows={convertOrdersToCustomerRows(orders)} 
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 3 }} }}
          pageSizeOptions={[3]} />
      </CardContent>
    </Card>

  )
}

export default WidgetRecentCustomers