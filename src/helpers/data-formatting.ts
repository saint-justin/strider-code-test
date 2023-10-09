import { Item, Order } from "../types";

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
      itemCount: order.Items.reduce((acc, item) => acc + parseInt(item.Quantity), 0),
      total: reformatCost(order.Total),
    }))
    .sort((a: FormattedOrder, b: FormattedOrder) => 
      new Date(b.date).valueOf() - new Date(a.date).valueOf()
    );
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