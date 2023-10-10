/* ---- Order Data Types ---- */
export interface Order {
  OrderId: number;
  CustomerId: number;
  CustomerName: string;
  Total: string;  // sum of ItemPrice of all Items
  Date: Date;
  Items: Item[];
}

export interface Item {
  Item: string;
  ItemPrice: string; //price format $DDD.CC
  Quantity: string;
}

export interface CustomerInfo {
  id: number;
  name: string;
  mostRecentOrder: Date;
  totalOrderSpending: string;
  orders: Order[];
}

/* ---- Component Data Types ---- */

export interface OrderProps {
  orders: Order[];
}