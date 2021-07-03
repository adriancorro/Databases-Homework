const express = require('express');
const app = express();

 const { Pool } = require('pg');
 const bodyParser = require("body-parser");
 app.use(bodyParser.json());


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'admin',
    port: 5432
});

app.get("/", function(req, res) {
    try {
      
        res.send(res.statusCode)
     
    
    } catch (error) {
        res.send(res.statusCode)
    }
    
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

// TASK WEEK-3
/* - Update the previous GET endpoint `/products` to filter the list of products by name using a query parameter, for example `/products?name=Cup`. This endpoint should still work even if you don't use the `name` query parameter!
 */
// with query
const queryProductSearchName = `SELECT supplier_name, product_name, supplier_id FROM products INNER JOIN  suppliers ON suppliers.id=products.supplier_id WHERE  product_name =  $1  `
const queryProducts = 'SELECT supplier_name, product_name, supplier_id FROM products INNER JOIN  suppliers ON suppliers.id=products.supplier_id'

app.get("/products2", function async (req, res) {
    let query = req.query.name;
    try {
        
        if (query){
            pool.query(queryProductSearchName, [query]  , (error, result) => {
                if (result){
                    res.json(result.rows);
                }else{
                    res.send(error.message)
                }
            })

        }else{
            pool.query(queryProducts  , (error, result) => {
                if (result){
                    res.json(result.rows);
                }else{
                    res.send(error.message)
                }
            })
        }
     ;
} catch (error) {
        console.error(error.message);
  }
});

// with parameters
app.get("/products/:nameProduct", function(req, res) {
    const nameProduct = req.params.nameProduct;

    try {
        pool.query(`SELECT supplier_name, product_name, supplier_id FROM products INNER JOIN  suppliers ON suppliers.id=products.supplier_id WHERE  product_name =  '${nameProduct}'  `   , (error, result) => {
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


/* - Add a new GET endpoint `/customers/:customerId` to load a single customer by ID.
 */

app.get("/customers/:customersId", function(req, res) {
    const customersId = req.params.customersId;

    try {
        pool.query(`SELECT * FROM customers WHERE customers.id =  '${customersId}'  `, (error, result) => {
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



/* - Add a new POST endpoint `/customers` to create a new customer.
 */

app.post("/customers", function (req, res) {
    const newCustomersName = req.body.name;
    const newCustomersAddress = req.body.address;
    const newCustomersCity = req.body.city;
    const newCustomersCountry = req.body.country;
  
    const query =
      "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
  
    pool
      .query(query, [newCustomersName, newCustomersAddress, newCustomersCity, newCustomersCountry ])
      .then(() => res.send("New Customers created!"))
      .catch((e) => console.error(e));
  });

app.listen(3000, () => console.log("Server is up and running"))
