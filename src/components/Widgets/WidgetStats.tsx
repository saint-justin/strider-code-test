import * as React from 'react';
import { useOrderContext } from '../../hooks/useOrders';
import { getMostExpensiveOrder, getMostPopularItem, getTotalOrders, getTotalSales } from '../../helpers/data-parsing';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { reformatCost } from '../../helpers/data-formatting';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../constants';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const WidgetStats = () => {
  const { orders } = useOrderContext();
  const navigate = useNavigate();

  const totalSales = getTotalSales(orders);
  const totalOrders = getTotalOrders(orders);
  const [mostPopularName, mostPopularCount] = getMostPopularItem(orders);
  const mostExpensive = getMostExpensiveOrder(orders);

  return (
    <Card  sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant={'h5'} mb={2}>Sales Stats</Typography>

        <Box>
          <Typography sx={{ fontSize: 14 }} color='text.secondary'>
            Total Sales
          </Typography>
          <Typography variant='h5' component='span' gutterBottom color='text.primary'>
            { reformatCost(`$${totalSales}`) }
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography component='div' sx={{ fontSize: 14 }} color='text.secondary'>
            You received a total of <Typography component='span' color='text.primary'>{totalOrders}</Typography> orders.<br />
            
            The <Typography component='span' color='text.primary'>{mostPopularName}</Typography> was your most popular item 
            with a total of <Typography component='span' color='text.primary'>{mostPopularCount}</Typography> items sold.<br /><br />
            
            The most expensive order was Order <Typography component='span' color='text.primary'>#{mostExpensive.OrderId + ' ' }</Typography>
            purchased by <Typography component='span' color='text.primary'>Customer { mostExpensive.CustomerId}</Typography>. <br /> 
            
            The order included <Typography component='span' color='text.primary'>{ mostExpensive.Items.length }</Typography> items
            for a total price of <Typography component='span' color='text.primary'>{ reformatCost(mostExpensive.Total) }</Typography>.
          </Typography>
        </Box>

        <CardActions sx={{ p: 0, mt:4}}>
          <Button size={'small'} color={'primary'} variant={'outlined'} onClick={() => navigate(Paths.ORDERS)}>
            See all orders <ArrowRightAltIcon sx={{ ml: 1 }} />
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default WidgetStats;