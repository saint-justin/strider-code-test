import { CustomerInfo, Order } from "./types";

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

export const PLACEHOLDER_ORDER: Order = {
  OrderId: 0,
  CustomerId: 0,
  CustomerName: '',
  Total: '$0.00',
  Date: new Date(Date.now()),
  Items: []
}

export const PLACEHOLDER_CUSTOMER_INFO: CustomerInfo = {
  id: -1,
  name: "",
  mostRecentOrder: new Date(Date.now()),
  totalOrderSpending: "",
  orders: []
}