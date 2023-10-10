import * as React from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Card, CardContent, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { convertOrdersToItemInfo } from '../helpers/data-formatting';
import { useOrderContext } from '../hooks/useOrders';

const ItemsPage = () => {
  const navigate = useNavigate();
  const { orders } = useOrderContext();

  const columns: GridColDef[] = [
    { 
      field: 'id',
      headerName: 'Item',
      flex: 1,
      renderCell: (props) => (
        <Link sx={{ cursor: 'pointer'}} onClick={() => navigate(`/items/${props.value}`)}>{props.value}</Link>
      )
    },
    { field: 'totalSales', headerName: 'Total Sales', flex: 1, renderCell: (props) => <>${props.value.toFixed(2)}</> },
    { field: 'quantity', headerName: 'Quantity Sold', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1, renderCell: (props) => <>${props.value.toFixed(2)} each</> },

  ]

  return (
    <PageContentWrapper>
      <Card sx={{ display: 'flex', flexDirection: 'column', width: '90%' }}> 
        <CardContent>
          <Typography variant={'h5'} ml={'12px'} mb={1}>All Items</Typography>
          {
            orders.length > 0 
            ? <DataGrid 
                sx={{ minWidth: '550px'}} 
                rows={convertOrdersToItemInfo(orders)} 
                columns={columns} />
            : 'loading...'
          }
        </CardContent>
      </Card>
    </PageContentWrapper>
  )
}

export default ItemsPage