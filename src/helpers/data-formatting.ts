import { Order } from "../types";

export interface FormattedOrder {
  id: number; 
  date: string; 
  customerName: string; 
  itemCount: number; 
  total: string;
}

/**
 * @param {string} cost - Default data format cost string (e.g. [$1 or $123.5])
 * @returns {string} - Formatted cost string prefixed with a '$' with two decimal places
 * e.g. [$1] -> [$1.00] or [$123.5] -> [$123.50]
 */
export const reformatCost = (cost: string): string => `$${parseFloat(cost.slice(1)).toFixed(2)}`;

/**
 * @param {Order[]} orders - Default data format for order array 
 * @returns {FormattedOrder[]} - Reformatted order data for DataGrid sorted by recency
 */
export const convertOrdersToRows = (orders: Order[]) => {
  return orders
    .map((order, index) => ({
      id: index,
      date: new Date(order.Date).toLocaleDateString(),
      customerName: order.CustomerName,
      itemCount: order.Items.length,
      total: reformatCost(order.Total),
    }))
    .sort((a: FormattedOrder, b: FormattedOrder) => 
      new Date(b.date).valueOf() - new Date(a.date).valueOf()
    );
}