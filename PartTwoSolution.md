# SQL Code Test

### Preface
Hiya, just for reference SQL is a tool that I haven't used too often or too recently so you have my apologies of some of this is approached in a non-standard way and/or it's not exactly what you were looking for. A lot of this is me re-learning what I used to know as I'm going. 

## Table Creation
This piece was relatively straightforward. There weren't any explicit requirements for character counts, decimal precision, or the like so I just set these up according to best guess. 

```sql
-- Create Customers table
CREATE TABLE Customers (
    CustomerId INT PRIMARY KEY,
    CustomerName VARCHAR(255)
);

-- Create Orders table
CREATE TABLE Orders (
    OrderId INT PRIMARY KEY,
    CustomerId INT,
    Total DECIMAL(10, 2),
    OrderDate DATETIME
);

-- Create Items table
CREATE TABLE Items (
    ItemId INT IDENTITY(1,1) PRIMARY KEY,
    OrderId INT,
    ItemName VARCHAR(255),
    ItemPrice DECIMAL(10, 2),
    Quantity INT
);
```

## Data Insertion
My solution here felt pretty manual, but given the response I got from the recruiter/dev overlooking this, I was pretty certain that using JavaScript/Python would be missing the point of the excercise. 

I did find some resources on [JSON content ingestion](https://learn.microsoft.com/en-us/sql/relational-databases/json/json-data-sql-server?view=sql-server-ver16), but I had some trouble getting it to work in dbfiddle for some reason (mostly due to dense error messaging) so I went ahead with this method to get _something_ up and running.

```sql
-- Customers table
INSERT INTO Customers (CustomerId, CustomerName)
VALUES
    (1, 'Elizabeth'),
    (2, 'Alexander'),
    (3, 'Emira'),
    (4, 'LJ'),
    (5, 'Armand'),
    (6, 'Elizabeth');

-- Orders table
INSERT INTO Orders (OrderId, CustomerId, Total, OrderDate)
VALUES
    (1, 1, 30.00, '2021-02-01 08:30:00.000'),
    (2, 2, 52.50, '2021-02-02 10:00:00.000'),
    (3, 1, 6.00, '2021-02-02 12:46:00.000'),
    (4, 3, 30.50, '2021-02-03 15:25:00.000'),
    (5, 4, 36.00, '2021-02-04 18:50:00.000'),
    (6, 5, 52.50, '2021-02-04 08:05:00.000'),
    (7, 6, 30.50, '2021-02-06 17:30:00.000'),
    (8, 3, 18.00, '2021-02-08 16:30:00.000');

-- Items table
INSERT INTO Items (OrderId, ItemName, ItemPrice, Quantity)
VALUES
    (1, 'Candle', 3.00, 3),
    (1, 'Book', 15.00, 1),
    (1, 'Pen', 0.75, 1),
    (1, 'Paper', 5.25, 1),
    (2, 'Book', 15.00, 1),
    (2, 'Jar', 12.50, 3),
    (3, 'Pen', 0.75, 1),
    (3, 'Paper', 5.25, 1),
    (4, 'Candle', 3.00, 1),
    (4, 'Book', 15.00, 1),
    (4, 'Jar', 12.50, 1),
    (5, 'Pen', 0.75, 1),
    (5, 'Book', 15.00, 2),
    (5, 'Paper', 5.25, 1),
    (6, 'Book', 15.00, 1),
    (6, 'Jar', 12.50, 3),
    (7, 'Movie', 18.00, 1),
    (7, 'Jar', 12.50, 1),
    (8, 'Movie', 18.00, 1);
```

## Query Script Solutions
Most of these were fairly straightforward. Below is a slightly cleaned up version of the DBFiddle markdown copy. 


### Which customers are repeat customers?
```sql
SELECT CustomerId, CustomerName
FROM Customers
WHERE CustomerId IN (
    SELECT CustomerId
    FROM Orders
    GROUP BY CustomerId
    HAVING COUNT(*) > 1
);

```

| CustomerId | CustomerName |
| ----------:|:------------|
| 1 | Elizabeth |
| 3 | Emira |

--- 

### Which customer has spent the most?

``` sql
SELECT TOP 1 CustomerId, CustomerName
FROM (
    SELECT C.CustomerId, C.CustomerName, SUM(O.Total) AS TotalSpent
    FROM Customers AS C
    INNER JOIN Orders AS O ON C.CustomerId = O.CustomerId
    GROUP BY C.CustomerId, C.CustomerName
) AS CustomerTotals
ORDER BY TotalSpent DESC;

```

| CustomerId | CustomerName |
| ----------:|:------------|
| 2 | Alexander |

--- 
### How many customers have shopped at the store?

```sql
SELECT COUNT(DISTINCT CustomerId) AS NumberOfCustomers
FROM Orders;
```
| NumberOfCustomers |
| -----------------:|
| 6 |

--- 
### Which item has been purchase the most?

```sql
SELECT TOP 1 ItemName
FROM (
    SELECT ItemName, SUM(Quantity) AS TotalQuantity
    FROM Items
    GROUP BY ItemName
) AS ItemQuantities
ORDER BY TotalQuantity DESC;
```
| ItemName |
| :--------|
| Jar |

---

[DB Fiddle link](https://dbfiddle.uk/RHjeSDtU).
