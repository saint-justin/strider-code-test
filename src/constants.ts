// I'm aware having a blanket 'constants' file isn't best practice, but using it here for the 
// sake of expedience. In a larger project, I'd break these out into more specific files.

export const Paths = {
  HOME: '/',
  ORDERS: '/orders',
  ORDER: '/order/:id',
  CUSTOMERS: '/customers',
  CUSTOMER: '/customer/:id',
  ITEMS: '/items',
  ITEM: '/item/:id',
}

export const STRIDER_PASSTHROUGH_URI = 'https://us-central1-strider-passthrough.cloudfunctions.net/api';