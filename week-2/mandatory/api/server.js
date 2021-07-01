
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

app.get("/", function(req, res) {
    pool.query('SELECT * FROM customers', (error, result) => {
        res.json(result.rows);
    });
});



/* const queryResult = await pool.query(
    "SELECT * FROM users where user_id = " + userId
);
const user = queryResult.rows[0]; */


app.listen(3000, () => console.log("Server is up and running"))
