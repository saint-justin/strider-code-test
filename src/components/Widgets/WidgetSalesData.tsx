import * as React from 'react';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { useOrderContext } from '../../hooks/useOrders';
import { PieChart } from '@mui/x-charts/PieChart';
import { MakeOptional } from '@mui/x-charts/models/helpers';
import { DefaultizedPieValueType, PieItemIdentifier, PieValueType } from '@mui/x-charts';
import { getCustomerInfoFromOrders } from '../../helpers/data-formatting';
import { useNavigate } from 'react-router-dom';

const WidgetSalesData = () => {
  const { orders } = useOrderContext();
  const navigate = useNavigate();

  const allCustomers = new Set(orders.map((order) => order.CustomerId.toString()));
  const allCustomerInfo = Array.from(allCustomers).map((customerId) => getCustomerInfoFromOrders(orders, customerId));

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '100%'}}>
          <Typography variant={'h5'} ml={'12px'} mb={1}>Customer Spending</Typography>
          <PieChart
            title='Total Customer Sales'
            series={[{ 
              data: allCustomerInfo.map((customer, index) => ({
                id: index.toString(),
                value: parseFloat(customer!.totalOrderSpending.slice(1)),
                label: `${customer!.name}, Customer #${customer!.id}`,
              })).sort((a, b) => b.value - a.value),
              arcLabel: (params: DefaultizedPieValueType) => params.label.slice(-2),
              valueFormatter: ((v: MakeOptional<PieValueType, "id">) => `$${v.value.toFixed(2)}`),
              paddingAngle: 5,
              outerRadius: 100,
              innerRadius: 50,
              cx: 150,
              cy: 95,
             }]}
            width={300}
            height={200}
            background={'#fff'}
            sx={{
              '.MuiChartsLegend-root': { display: 'none' } 
            }}
          />
        </Box>

      </CardContent>
    </Card>
        
  )
}

export default WidgetSalesData;