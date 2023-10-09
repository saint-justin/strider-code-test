import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useOrderContext } from '../../hooks/useOrders';
import { convertOrdersToRows } from '../../helpers/data-formatting';

const columns: GridColDef[] = [
  { field: 'date', headerName: 'Date', flex: 1 },
  { field: 'customerName', headerName: 'Name', flex: 1 },
  { field: 'orderId', headerName: 'Order ID', flex: 1 },
  { field: 'total', headerName: 'Order Price', flex: 1 },
  { field: 'itemCount', headerName: 'Total Items', flex: 1 },
]

const WidgetRecentOrder = () => {
  const { orders } = useOrderContext();

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant={'h5'} ml={'12px'} mb={1}>Orders by Recency</Typography>
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