
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
    pool.query('SELECT * FROM customers', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/suppliers", function(req, res) {
    try {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        res.json(result.rows);
    });
} catch (error) {
    console.error(error.message);
  }
});

app.get("/products", function(req, res) {
    try {
    pool.query('SELECT supplier_name, product_name FROM products INNER JOIN  suppliers ON products.id=products.supplier_id', (error, result) => {
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








/* const queryResult = await pool.query(
    "SELECT * FROM users where user_id = " + userId
);
const user = queryResult.rows[0]; */


app.listen(3000, () => console.log("Server is up and running"))
