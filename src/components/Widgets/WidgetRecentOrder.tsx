import * as React from 'react';
import { Card, CardContent, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useOrderContext } from '../../hooks/useOrders';
import { convertOrdersToRows } from '../../helpers/data-formatting';
import { useNavigate } from 'react-router-dom';

const WidgetRecentOrder = () => {
  const { orders } = useOrderContext();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'customerName', headerName: 'Name', flex: 1 },
    { field: 'total', headerName: 'Order Price', flex: 1 },
    { field: 'itemCount', headerName: 'Total Items', flex: 1 },
    { 
      field: 'orderId', 
      headerName: 'Link', 
      flex: 1,
      renderCell: (props) => (
        <Link sx={{ cursor: 'pointer'}} onClick={() => navigate(`/order/${props.value}`)}>Order #{props.value}</Link>
      ),
    },
  ]

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant={'h5'} ml={'12px'} mb={1}>Most Recent Orders</Typography>
        <DataGrid 
          rows={convertOrdersToRows(orders)} 
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 3,
              },
            },
          }}
          pageSizeOptions={[3]} />
      </CardContent>
    </Card>
  )
}

export default WidgetRecentOrder;