import { CustomerInfo, Item, Order } from "../types";

export interface FormattedOrder {
  id: number; 
  date: string; 
  customerName: string; 
  itemCount: number; 
  total: string;
}

/**
 * Helper function that reformats the default cost strings to a more readable format
 * @param {string} cost - Default data format cost string (e.g. [$1 or $123.5])
 * @returns {string} - Formatted cost string prefixed with a '$' with two decimal places
 * e.g. [$1] -> [$1.00] or [$123.5] -> [$123.50]
 */
export const reformatCost = (cost: string): string => `$${parseFloat(cost.slice(1)).toFixed(2)}`;

/**
 * Helper function that sorts and reformats the default data format for order array grid data format
 * @param {Order[]} orders - Default data format for order array 
 * @returns {FormattedOrder[]} - Reformatted order data for DataGrid sorted by recency
 */
export const convertOrdersToRows = (orders: Order[]) => {
  return orders
    .map((order, index) => ({
      id: index,
      date: new Date(order.Date).toLocaleDateString(),
      orderId: order.OrderId,
      customerName: order.CustomerName,
      customerId: order.CustomerId,
      itemCount: order.Items.reduce((acc, item) => acc + parseInt(item.Quantity), 0),
      total: reformatCost(order.Total),
    }))
}

/**
 * Helper function that reformates a Date object in the format (MM/DD/YYYY @ HH:MM AM/PM)
 * @param {Date} date - Date object to be reformatted 
 * @returns           - Reformatted date string
 */
export const reformatDate = (date: Date): string =>  {
  const dateStr = new Date(date).toLocaleDateString();
  const timeStr = new Date(date).toLocaleTimeString([], { timeStyle: 'short' })
  return `${dateStr} @ ${timeStr}`;
}

/**
 * Helper function that reformats item data into a total cost string in the format ($DDD.CC)
 * @param { Item } item - Item object to be reformatted
 * @returns             - Reformatted total cost string
 */
export const formatTotalCostFromItem = (item: Item): string => {
  const totalCost: number = parseInt(item.Quantity) * parseFloat(item.ItemPrice.slice(1));
  return `$${totalCost.toFixed(2)}`;
}

/**
 * Helper function that pulls customer data from orders array
 * @param { Order[] } orders - Array of orders to pull from 
 * @param { string }  customerId - CustomerId to identify customer by 
 * @returns { CustomerInfo | undefined } - CustomerInfo object if customer has orders, undefined otherwise
 */
export const getCustomerInfoFromOrders = (orders: Order[], customerId: string): CustomerInfo | undefined => {
  const customerOrders = orders.filter(order => order.CustomerId === parseInt(customerId));
  if (customerOrders.length === 0) {
    return undefined;
  }

  const mostRecentOrderDate = customerOrders
    .map(order => new Date(order.Date))
    .sort((a, b) => b.valueOf() - a.valueOf())
    [0];
  const orderSpending = customerOrders
    .map((order) => parseFloat(order.Total.slice(1)))
    .reduce((acc, curr) => acc + curr, 0);

  return ({
    id: parseInt(customerId),
    name: customerOrders[0].CustomerName,
    mostRecentOrder: mostRecentOrderDate,
    totalOrderSpending: `$${orderSpending.toFixed(2)}`,
    orders: customerOrders
  })
}

/**
 * Helper function that sorts and reformats the order data into a set of unique customer data entries
 * @param {Order[]} orders - Default order format array 
 * @returns {FormattedOrder[]} - Reformatted order data for DataGrid
 */
export const convertOrdersToCustomerRows = (orders: Order[]): CustomerInfo[] => {
  const customerIdSet = new Set(orders.map(order => order.CustomerId));
  return Array.from(customerIdSet)
    .map(id => getCustomerInfoFromOrders(orders, id.toString()))
    .filter(value => value !== undefined) as CustomerInfo[]
}