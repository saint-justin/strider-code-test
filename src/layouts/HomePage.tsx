import * as React from 'react';
import { Grid } from '@mui/material';
import PageContentWrapper from '../components/PageContentWrapper';
import WidgetStats from '../components/Widgets/WidgetStats';
import WidgetRecentOrder from '../components/Widgets/WidgetRecentOrder';

/**
 * Home page layout including high level graphs for order data and nav tooling
 */
const HomePage = () => {

  const generateGridItems = (gridComponents: React.ReactNode[]): JSX.Element[] => {
    return gridComponents.map((component: React.ReactNode, index: number) => (
      <Grid item xs={6} sx={{ display: 'flex', width: '100%' }} key={`grid_item_${index}`}>{component}</Grid>
    ));
  }

  const gridItems = [<WidgetStats />, <WidgetRecentOrder />, <WidgetRecentOrder />, <WidgetStats />];

  return (
    <PageContentWrapper>
      <Grid container spacing={2}>
        { generateGridItems(gridItems) }
      </Grid>
    </PageContentWrapper>
  )
}

export default HomePage;