import * as React from 'react';
import PageContentWrapper from '../components/PageContentWrapper';
import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router-dom';
import LabeledContent from '../components/LabeledContent';
import { PLACEHOLDER_CUSTOMER_INFO } from '../constants';
import { getCustomerInfoFromOrders, reformatCost, reformatDate } from '../helpers/data-formatting';
import { useOrderContext } from '../hooks/useOrders';
import { Order } from '../types';

const CustomerPage = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useOrderContext();

  let customerInfo = getCustomerInfoFromOrders(orders, id!);
  if (customerInfo === undefined) {
    customerInfo = PLACEHOLDER_CUSTOMER_INFO
    // TODO: Handle customer not found error messaging
  }

  const averageCustomerSpending = parseFloat(customerInfo.totalOrderSpending.slice(1)) / customerInfo.orders.length;

  const formatAccordionItem = (order: Order, index: number): JSX.Element => (
    <Accordion key={`item_accordian_${index}`} variant={'outlined'}>
      <AccordionSummary>Order #{order.OrderId} - {reformatCost(order.Total)}</AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', flexDirection: 'row', gap: '4em' }}>
        <LabeledContent label={'Total Cost'} content={reformatCost(order.Total)} />
        <LabeledContent label={'Date'} content={reformatDate(order.Date)} />
        <LabeledContent label={'Items'} content={order.Items.reduce((acc, curr) => acc + parseInt(curr.Quantity), 0).toString()} />
        <LabeledContent label={'Link'} content={`Order #${order.OrderId}`} linkPath={`/orders/${order.OrderId}`} />
      </AccordionDetails>
    </Accordion>
  )

  return (
    <PageContentWrapper>
      <Grid container spacing={2} display={'flex'}>
        <Grid item xs={12}>
          <Typography variant={'h5'}> Customer #{id} </Typography>
        </Grid>

        <Grid item xs={4} display={'flex'}>
          <Card sx={{ height: '100%', width: '100%' }}>
            <CardContent>
              <LabeledContent emphasize label={'Total Spending'} content={customerInfo.totalOrderSpending} />
              <LabeledContent label={'Name'} content={customerInfo.name} />
              <LabeledContent label={'Average Spending'} content={reformatCost(`$${averageCustomerSpending}`) + ' per order'} />
              <LabeledContent label={'Total Orders'} content={customerInfo.orders.length.toString()} />
              <LabeledContent label={'Most Recent Order'} content={reformatDate(customerInfo.mostRecentOrder)} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant={'h5'} mb={1}>Order Items</Typography>
              { customerInfo.orders.map((item, index) => formatAccordionItem(item, index)) }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContentWrapper>
  )
}

export default CustomerPage;