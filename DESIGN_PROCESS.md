# Input Data

### Example Input

Data input is an array of Order objects
```ts
//price format refers to $DD.CC or just $DD with no cents

interface Order {
  OrderId: number;
  CustomerId: number;
  CustomerName: string;
  Total: string;  // sum of ItemPrice of all Items
  Date: Date;
  Items: Item[];
}

interface Item {
  Item: string;
  ItemPrice: string; //price format $DDD.CC
  Quantity: number;
}
```

## Customer Requirements:

- Home page must display high level order stats
  - 4 views, one per item/customer/order and one default to help nav to others
  - Graphs on orders?
- Home page must display links to customer order history
- Home page must display links to item order history
- (opt) Any other beneficial info

## Technical Bonuses
 - React hooks
 - MUI tables for data
 - Graphs for order stats
 - Unit tests

