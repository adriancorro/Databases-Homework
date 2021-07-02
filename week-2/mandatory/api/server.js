
const express = require('express');
const app = express();


const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'admin',
    port: 5432
});

app.get("/customers", function(req, res) {
    try {
        pool.query('SELECT * FROM customers', (error, result) => {
            if (result){
                res.json(result.rows);
            }else{
                res.send(error.message)
            }
        });
    } catch (error) {
            console.error(error.message);
    }
});

app.get("/suppliers", function(req, res) {
    try {
        pool.query('SELECT * FROM suppliers', (error, result) => {
            if (result){
                res.json(result.rows);
            }else{
                res.send(error.message)
            }
        });
} catch (error) {
        console.error(error.message);
  }
});

/* 
Tabla products contiene 
id |      product_name       | unit_price | supplier_id

Tabla suppliers contiene 
id | supplier_name |    country

Unimos con products.supplier_id = suppliers.id 
*/

app.get("/products", function(req, res) {
    try {
        pool.query('SELECT supplier_name, product_name, supplier_id FROM products INNER JOIN  suppliers ON suppliers.id=products.supplier_id', (error, result) => {
            if (result){
                res.json(result.rows);
            }else{
                res.send(error.message)
            }
        });
} catch (error) {
        console.error(error.message);
  }
});

app.listen(3000, () => console.log("Server is up and running"))
