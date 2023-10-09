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

/* ---- Component Data Types ---- */

export interface OrderProps {
  orders: Order[];
}