# Input Data

### Example Input

Data input is an array of Order objects
```ts
//price format refers to $DDD.CC

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

