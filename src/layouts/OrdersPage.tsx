import * as React from 'react';
import { Card, CardContent, Link, Typography } from '@mui/material';
import { useOrderContext } from '../hooks/useOrders';
import { GridColDef, DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { convertOrdersToRows } from '../helpers/data-formatting';
import PageContentWrapper from '../components/PageContentWrapper';

/**
 * Layout to display overview table of all orders in the system
 */
const OrdersPage = () => {
  const { orders } = useOrderContext();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'customerName', headerName: 'Customer Name', flex: 1 },
    { field: 'itemCount', headerName: 'Items Purchased', flex: 1 },
    { field: 'total', headerName: 'Order Total', flex: 1 },
    { 
      field: 'customerId', 
      headerName: 'Customer Link', 
      flex: 1,
      renderCell: (props) => (
        <Link sx={{ cursor: 'pointer'}} onClick={() => navigate(`/customers/${props.value}`)}>Customer #{props.value}</Link>
      )
    },
    { 
      field: 'id', 
      headerName: 'Order Link', 
      flex: 1, 
      renderCell: (props) => (
      <Link sx={{ cursor: 'pointer'}} onClick={() => navigate(`/orders/${props.value}`)}>Order #{props.value}</Link>
      ),
    }
  ]

  return (
    <PageContentWrapper>
      <Card sx={{ display: 'flex', flexDirection: 'column', width: '90%' }}> 
        <CardContent>
          <Typography variant={'h5'} ml={'12px'} mb={1}>All Orders</Typography>
          {
            orders.length > 0 
            ? <DataGrid 
                sx={{ minWidth: '550px', backgroundColor: 'grey.900'}} 
                rows={convertOrdersToRows(orders)} 
                columns={columns} />
            : 'loading...'
          }
        </CardContent>
      </Card>
    </PageContentWrapper>
    )
}

export default OrdersPage;