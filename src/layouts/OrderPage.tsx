import * as React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Accordion, 
  AccordionDetails, 
  AccordionSummary, 
  Card, 
  CardContent, 
  Grid, 
  Typography 
} from '@mui/material';
import { useOrderContext } from '../hooks/useOrders';
import PageContentWrapper from '../components/PageContentWrapper';
import LabeledContent from '../components/LabeledContent';
import { PLACEHOLDER_ORDER } from '../constants';
import { Item, Order } from '../types';
import { formatTotalCostFromItem, reformatCost, reformatDate } from '../helpers/data-formatting';

/**
 * Order page layout to show details on a single order based on the passed ID in the path/url
 */
const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useOrderContext();

  let order: Order = PLACEHOLDER_ORDER;
  if (orders.length > 0) {
    const foundOrder = orders.find(order => order.OrderId === parseInt(id!));
    if (foundOrder) order = foundOrder;
    else {
      // TODO: handle order not found
    }
  }

  const formatAccordionItem = (item: Item, index: number): JSX.Element => (
    <Accordion key={`item_accordian_${index}`} variant={'outlined'}>
      <AccordionSummary>{item.Item} ({item.Quantity})</AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', flexDirection: 'row', gap: '4em'}}>
        <LabeledContent label={'Total Cost'} content={formatTotalCostFromItem(item)} />
        <LabeledContent label={'Per Item Cost'} content={reformatCost(item.ItemPrice)} />
        <LabeledContent label={'Quantity'} content={item.Quantity} />
        <LabeledContent label={'Link'} content={`${item.Item} Page`} linkPath={`/item/${item.Item}`} />
      </AccordionDetails>
    </Accordion>
  )

  return (
    <PageContentWrapper>
      <Grid container spacing={2} display={'flex'}>
        <Grid item xs={12}>
          <Typography variant={'h5'}> Order #{id} </Typography>
        </Grid>

        <Grid item xs={4} display={'flex'}>
          <Card sx={{ height: '100%', width: '100%' }}>
            <CardContent>
              <LabeledContent emphasize label={'Total'} content={reformatCost(order.Total)} />
              <LabeledContent label={'Customer Name'} content={`${order.CustomerName} (Customer ID #${order.CustomerId})`} linkPath={`/customer/${order.CustomerId}`}/>
              <LabeledContent label={'Placed On'} content={reformatDate(order.Date)} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant={'h5'} mb={1}>Order Items</Typography>
              { order.Items.map((item, index) => formatAccordionItem(item, index)) }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContentWrapper>
  )
}

export default OrderPage;