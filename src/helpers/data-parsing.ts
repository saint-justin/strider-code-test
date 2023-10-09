import { Order } from "../types";

/**
 * Helper function to pull total sales from a list of orders
 * @param {Order[]} orders - List of orders to pull data from 
 * @returns {number}       - Total sales from passed orders
 */
export const getTotalSales = (orders: Order[]): number => {
  return orders.reduce((acc, order) => acc + parseFloat(order.Total.slice(1)), 0);
}

/**
 * Helper function to pull total amount of orders from a list of orders
 * @param {Order[]} orders - List of orders to pull data from 
 * @returns {number}       - Total count of passed orders
 */
export const getTotalOrders = (orders: Order[]): number => orders.length;

/**
 * Helper function to pull the most popular item name and count from a list of orders
 * @param {Order[]} orders     - List of orders to pull data from
 * @returns {[string, number]} - Name of most popular item in passed orders formatted [name, count]
 */
export const getMostPopularItem = (orders: Order[]): [string, number] => {
  const itemCounts: Map<string, number> = new Map();
  orders.forEach(({ Items }: Order) => Items.forEach(({ Item, Quantity }) => {
    if (itemCounts.has(Item)) {
      itemCounts.set(Item, itemCounts.get(Item)! + parseInt(Quantity));
    } else {
      itemCounts.set(Item, parseInt(Quantity));
    }
  }));

  let mostPopularItem: [string, number] = ['', 0];
  for (const [item, count] of itemCounts.entries()) {
    if (count > mostPopularItem[1]) mostPopularItem = [item, count];
  }

  return mostPopularItem;
}

/**
 * Helper to pull the most expensive order from an array of orders
 * @param { Order[] } orders - List of orders to pull data from
 * @returns { Order[] }      - Order with the highest total price 
 */
export const getMostExpensiveOrder = (orders: Order[]): Order => {
  // Placeholder empty order while waiting for order data
  if (orders.length === 0) return ({
    OrderId: 0,
    CustomerId: 0,
    CustomerName: "",
    Total: "",
    Date: new Date(),
    Items: []
  });

  let mostExpensive: Order = orders[0];
  orders.forEach((order: Order) => {
    const total: number = parseFloat(order.Total.slice(1));
    if (total > parseFloat(mostExpensive.Total.slice(1))) mostExpensive = order;
  });

  return mostExpensive;
}