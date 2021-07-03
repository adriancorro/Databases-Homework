# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql

CREATE DATABASE cyf_ecommerce;

select name, address FROM customers WHERE  country = 'United States';
select * from customers ORDER BY name  ASC;
select * from products where unit_price > 100;
SELECT * FROM products WHERE product_name LIKE '%socks%';
SELECT *  FROM products  order by unit_price desc limit 5;
SELECT supplier_name, product_name, unit_price FROM products INNER JOIN  suppliers ON suppliers.id=products.supplier_id;
SELECT supplier_name, product_name FROM products INNER JOIN  suppliers ON suppliers.id=products.supplier_id WHERE country = 'United Kingdom' ;

8. Retrieve all orders from customer ID `1`
 select * from orders where customer_id = '1';

9. Retrieve all orders from customer named `Hope Crosby`
SELECT *  FROM orders INNER JOIN  customers ON customers.id= orders.customer_id WHERE name = 'Hope Crosby';

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
SELECT product_name, unit_price, quantity 
FROM order_items 
JOIN  products ON products.id=order_items.product_id 
JOIN  orders ON  orders.id=order_items.order_id 
WHERE order_reference= 'ORD006';

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference` `order_date`, `product_name`, `supplier_name` and `quantity`.

 SELECT name, order_reference, order_date, quantity , product_name, supplier_name 
 FROM customers 
 join orders on  orders.id=customers.id 
 join order_items on order_items.order_id=orders.id
 join  products  on products.id = order_items.product_id 
 join  suppliers on suppliers.id = products.supplier_id 

12. Retrieve the names of all customers who bought a product from a supplier from China.

 SELECT name 
 FROM customers 
 join orders on  orders.id=customers.id 
 join order_items on order_items.order_id=orders.id
 join  products  on products.id = order_items.product_id 
 join  suppliers on suppliers.id = products.supplier_id 
 where suppliers.country = 'China'











```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Setup

To prepare your environment for this homework, open a terminal and create a new database called `cyf_ecommerce`:

```sql
createdb cyf_ecommerce
```

Import the file [`cyf_ecommerce.sql`](./cyf_ecommerce.sql) in your newly created database:

```sql
psql -d cyf_ecommerce -f cyf_ecommerce.sql
```

Open the file `cyf_ecommerce.sql` in VSCode and make sure you understand all the SQL code. Take a piece of paper and draw the database with the different relations between tables. Identify the foreign keys and make sure you understand the full database schema.

## Task

Once you understand the database that you are going to work with, solve the following challenge by writing SQL queries using everything you learned about SQL:

1. Retrieve all the customers names and addresses who lives in United States
2. Retrieve all the customers ordered by ascending name
3. Retrieve all the products which cost more than 100
4. Retrieve all the products whose name contains the word `socks`
5. Retrieve the 5 most expensive products
6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
8. Retrieve all orders from customer ID `1`
9. Retrieve all orders from customer named `Hope Crosby`
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference` `order_date`, `product_name`, `supplier_name` and `quantity`.
12. Retrieve the names of all customers who bought a product from a supplier from China.
