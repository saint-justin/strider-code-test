import * as React from 'react';
import { Typography, Card, CardContent, Link } from '@mui/material';
import { convertOrdersToCustomerRows, reformatDate } from '../helpers/data-formatting';
import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '../hooks/useOrders';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PageContentWrapper from '../components/PageContentWrapper';

const CustomersPage = () => {
  const navigate = useNavigate();
  const { orders } = useOrderContext();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Customer', flex: 1 },
    { 
      field: 'mostRecentOrder', 
      headerName: 'Most Recent Order', 
      flex: 1,
      renderCell: (props) => <Typography>{reformatDate(new Date(props.value))}</Typography>
    },
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
    <PageContentWrapper>
      <Card sx={{ display: 'flex', flexDirection: 'column', width: '90%' }}> 
        <CardContent>
          <Typography variant={'h5'} ml={'12px'} mb={1}>All Customers</Typography>
          {
            orders.length > 0 
            ? <DataGrid 
                sx={{ minWidth: '550px'}} 
                rows={convertOrdersToCustomerRows(orders)} 
                columns={columns} />
            : 'loading...'
          }
        </CardContent>
      </Card>
    </PageContentWrapper>
  )
}

export default CustomersPage;