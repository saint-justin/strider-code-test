import { Order } from "../types"
import { getMostPopularItem, getTotalOrders, getTotalSales } from "./data-parsing";

/**
 *  OrderId: number;
 *  CustomerId: number;
 *  CustomerName: string;
 *  Total: string;  // sum of ItemPrice of all Items
 *  Date: Date;
 *  Items: Item[];
 */

const testOrderDefault: Order = { 
  OrderId: 1,
  CustomerId: 1,
  CustomerName: 'John Doe',
  Total: '$100.00',
  Date: new Date('2000-01-01'),
  Items: [
    {
      Item: 'Most Popular Item',
      ItemPrice: '$50.00',
      Quantity: '3'
    },
    {
      Item: 'Another Item',
      ItemPrice: '$50.00',
      Quantity: '1'
    }
  ]
};


const testOrderDecimal: Order = {
  OrderId: 2,
  CustomerId: 1,
  CustomerName: 'John Doe',
  Total: '$100.50',
  Date: new Date('2020-01-01'),
  Items: []
}

describe('Data parsing helpers', () => {
  describe('getTotalSales', () => {
    test('should add sales from passed orders', () => {
      const actualSales = getTotalSales([testOrderDefault, testOrderDefault]);
      expect(200).toEqual(actualSales);
    });

    test('should return 0 if no orders are passed', () => {
      const actualSales = getTotalSales([]);
      expect(0).toEqual(actualSales);
    })

    test('should work with decimals', () => {
      const actualSales = getTotalSales([testOrderDefault, testOrderDecimal]);
      expect(200.50).toEqual(actualSales);
    })
  })

  describe('getTotalOrders', () => {
    test('should return the number of orders passed', () => {
      const actualOrders = getTotalOrders([testOrderDefault, testOrderDefault]);
      expect(2).toEqual(actualOrders);
    });

    test('should return 0 if no orders are passed', () => {
      const actualOrders = getTotalOrders([]);
      expect(0).toEqual(actualOrders);
    });
  })
})

describe('getMostPopularItem', () => {
  describe('names', () => {
    test('should return the most popular item from a single order', () => {
      const [actualItem] = getMostPopularItem([testOrderDefault, testOrderDefault]);
      expect('Most Popular Item').toEqual(actualItem);
    })
  
    test('should return the most popular item with multiple orders', () => {
      const [actualItem] = getMostPopularItem([testOrderDefault, testOrderDecimal]);
      expect('Most Popular Item').toEqual(actualItem);
    })
  
    test('should return an empty string if no orders are passed', () => {
      const [actualItem] = getMostPopularItem([]);
      expect('').toEqual(actualItem);
    })
  })

  describe('counts', () => {
    test('should return the most popular item count from the only order', () => {
      const [actualItem, itemCount] = getMostPopularItem([testOrderDefault]);
      expect('Most Popular Item').toEqual(actualItem);
      expect(3).toEqual(itemCount);
    })

    test('should return the most popular item count across all orders', () => {
      const [actualItem, itemCount] = getMostPopularItem([testOrderDefault, testOrderDefault, testOrderDefault]);
      expect('Most Popular Item').toEqual(actualItem);
      expect(9).toEqual(itemCount);
    })
  })
 
});