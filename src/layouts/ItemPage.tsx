import * as React from 'react';
import { Grid, Typography, Card, CardContent, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { getItemInfoFromOrders, reformatCost, reformatDate } from '../helpers/data-formatting';
import { useParams } from 'react-router-dom';
import { PLACEHOLDER_ITEM_INFO } from '../constants';
import { useOrderContext } from '../hooks/useOrders';
import { Order } from '../types';
import PageContentWrapper from '../components/PageContentWrapper';
import LabeledContent from '../components/LabeledContent';

const ItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useOrderContext();

  let itemInfo = getItemInfoFromOrders(orders, id!);
  if (itemInfo === undefined) {
    itemInfo = PLACEHOLDER_ITEM_INFO
    // TODO: handle customer not found error messaging
  }

  const allOrdersWithItem = orders.filter(order => order.Items.some(item => item.Item === id));

  const formatAccordionItem = (order: Order, index: number): JSX.Element => (
    <Accordion key={`item_accordian_${index}`} variant={'outlined'}>
      <AccordionSummary>Order #{order.OrderId} - {reformatCost(order.Total)}</AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', flexDirection: 'row', gap: '4em' }}>
        <LabeledContent label={`Quantity Sold`} content={order.Items.find((item) => item.Item === id)!.Quantity} />
        <LabeledContent label={'Date'} content={reformatDate(order.Date)} />
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
              <LabeledContent emphasize label={'Total Earnings'} content={`$${itemInfo.totalSales}`} />
              <LabeledContent label={'Name'} content={itemInfo.id} />
              <LabeledContent label={'Total Orders'} content={itemInfo.quantity.toString()} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant={'h5'} mb={1}>Orders Including {id}</Typography>
              { allOrdersWithItem.map((item, index) => formatAccordionItem(item, index)) }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContentWrapper>
  )
}

export default ItemPage