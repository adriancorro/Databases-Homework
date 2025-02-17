
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
/* 
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
}); */

//****************************************************************************************************** */
/* TAREA HOME-WORK  WEEK - 3 
 */



// TASK WEEK-3
/* - Update the previous GET endpoint `/products` to filter the list of products by name using a query parameter, for example `/products?name=Cup`. This endpoint should still work even if you don't use the `name` query parameter!
 */
// with query
const queryProductSearchName = `SELECT supplier_name, product_name, supplier_id FROM products INNER JOIN  suppliers ON suppliers.id=products.supplier_id WHERE  product_name =  $1  `
const queryProducts = 'SELECT supplier_name, product_name, supplier_id FROM products INNER JOIN  suppliers ON suppliers.id=products.supplier_id'

app.get("/products", function  (req, res) {
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

/*   - Add a new POST endpoint `/products` to create a new product
   (with a product name, a price and a supplier id).
    Check that the price is a positive integer and that the
     supplier ID exists in the database, otherwise return an error. */

     app.post("/products", function (req, res) {
         //Desestructuracion.  Destructuring.
         const {product_name, unit_price, supplier_id}  = req.body; 

        // Sin desestructuracion. Without destructuring
        /* 
        const newproduct_name = req.body.product_name;
        const newunit_price = req.body.unit_price;
        const newsupplier_id = req.body.supplier_id;
         */
      
        const query =
          "INSERT INTO products (product_name, unit_price, supplier_id) VALUES ($1, $2, $3)";
      
        pool
          .query(query, [product_name, unit_price, supplier_id])
          .then(() => res.send("New product created!"))
          .catch((e) => {console.error(e);  res.send(e)});
      });


   /*    - Add a new POST endpoint `/customers/:customerId/orders` to 
      create a new order (including an order date, and an order reference) for
       a customer. Check that the customerId corresponds to an existing customer or return an error.
 */
               app.post("/customers/:customerId/orders", function (req, res) {
                //Desestructuración
                const { order_date, order_reference }  =  req.body
                const id =  parseInt(req.params.customerId) 

                if( !isNaN(id) && id >  0 ){
                    const queryFind = `select count(*) as num FROM customers WHERE id = $1`
                    pool 
                     .query(queryFind, [id])
                     .then( result => { 
                        console.log(result.rows[0].num )
                         if(result.rows[0].num > 0 ){
                            const query = "INSERT INTO orders (order_date, order_reference, customer_id ) VALUES ($1, $2, $3)";
                            pool
                            .query(query, [order_date,  order_reference, id ])
                            .then(() => res.send("New orders created!"))
                            .catch((e) => {console.error(e); res.send(e.detail) }); 
                         }else{ 
                             console.log("Customer not exist")
                             res.send("no exist") 
                         } 
                        }) 
                     .catch(e => res.send(e.detail))   

                }else{
                    res.send("invalid customer id")
                }
              });

    // EXTRA
    // INSERT DATA IN order_items
     app.post("/order_items", (req, res) =>{
         //Desestructuración
         const {order_id, product_id, quantity  } = req.body
         const insertDates = "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3) "
         pool.query(insertDates, [order_id, product_id, quantity])
            .then(() => res.send("New order_items!") )
            .catch(e => {res.send(e); console.log(e) })
    })  


/*     - Add a new PUT endpoint `/customers/:customerId` to update an existing customer (name, address, city and country).
 */
  const updateCustomer = `UPDATE customers SET name = $1, address = $2, city = $3, country = $4 where id = $5`;
  app.put("/customers/:customerId", (req, res)=> {
    let {  name, address, city, country } = req.body;
    const id =  parseInt(req.params.customerId) 
    pool.connect((err, client, release) => {
		if (err) {
			return console.error("Error acquiring client", err.stack);
		}

		client.query(updateCustomer, [name, address, city , country, id], (err, result) => {
			release();
			if (result.rowCount > 0) {
				res.status(201).send("1 row was updated");
			} else {
				res.status(404).send("Bad request");
			}
		});
	});
 
  })

/*   - Add a new DELETE endpoint `/orders/:orderId` to delete an existing order along all the associated order items.
 */


app.delete("/orders/:orderId" ,  (req, res) => {    
   const orderId = parseInt(req.params.orderId);
   const deleteOrder_idInOrderItems = "DELETE from order_items where  order_id = $1"
   const deleteOrder = "DELETE from orders WHERE id = $1"

   if(!isNaN(orderId) && orderId > 0 ){
       // 1-  We check that id exist in the orders table.
       const checkIdOrders =  "SELECT count(*) as num FROM orders WHERE id = $1"
       pool.query(checkIdOrders, [orderId])
              .then(result => {
                  if(result.rows[0].num > 0){
                        //2- To delete order id from table orders we must deleted order_id from table order_items. 
                        pool.query(deleteOrder_idInOrderItems, [orderId]).then(() => {
                            pool.query(deleteOrder, [orderId], (error, result) => {
                                if (result){
                                    //3  We delete our order
                                    res.send(`Order with ${orderId} deleted`)
                                    console.log(`Order with ${orderId} deleted.`)
                                }else{
                                res.send(`Order with ${orderId} not deleted. ${error}`)
                                console.log(`Order with ${orderId} not deleted. ${error}`)
                                }
                            })
                        })
                  }else{
                      res.send(` ID ${orderId} from table Orders not exist `)
                  }
              })
   }
})


/* - Add a new DELETE endpoint `/customers/:customerId` to delete an existing customer
 only if this customer doesn't have orders.
 */

app.delete("/customers/:customerId" ,  (req, res) =>{
    const customerId = parseInt(req.params.customerId)
/*     JOIN is not valid in a DELETE query according to the 
       postgresql documentation. You might need to concatenate 
       the left and right parts of the IN expression.

       You can't use the JOIN syntax to join to the table being
        deleted from. The correct syntax is to use USING instead:
 */

    const queryDeleteOrder_itemsIdFromOrders = "DELETE from  order_items USING orders WHERE orders.id=order_items.order_id   AND orders.customer_id = $1;"
    const queryDeleteOrder_items = " DELETE  FROM orders WHERE customer_id = $1" 
    const queryDeleteCustomerId = "DELETE from customers WHERE id = $1"
    const checkCustomerExists = "SELECT count(id) as num FROM customers WHERE id = $1"
    pool.query(checkCustomerExists , [customerId])
         .then( result => {
             if(result.rows[0].num > 0){
                    pool.query(queryDeleteOrder_itemsIdFromOrders, [customerId])
                    .then(()=>{
                        pool.query( queryDeleteOrder_items, [customerId])
                    })
                    .then(() =>{
                        pool.query(queryDeleteCustomerId, [customerId] , (error, result) =>{
                            if(result){
                                res.send("delete")
                            }else{
                                res.send(`not delete  ${error}` )
                            }
                        })
            
                    })
                    .catch((e) => {console.log(e) ; res.send(e.detail)})
             }else{
                 res.send("customers not exist")
             }
         })
         .catch( e => console.log(e))
   /*  
 */
  
})

/* - Add a new GET endpoint `/customers/:customerId/orders` to load all the orders along the items 
in the orders of a specific customer. Especially, the following information should be 
returned: order references, order dates, product names, unit prices, suppliers and quantities.
 */

app.get("/customers/:customerId/orders" , (req, res) => {
   const customerId = parseInt(req.params.customerId) 
   if(!isNaN(customerId) && customerId > 0 ){
       const checkCustomerId = "SELECT count(id) AS num FROM customers WHERE id = $1"
       pool.query(checkCustomerId, [customerId])
              .then(response => {
                  if(response.rows[0].num > 0){
                    const queryGetCustomers = " SELECT order_reference, order_date,  product_name , unit_price, supplier_name, quantity  FROM orders JOIN order_items  ON  order_items.order_id=orders.id JOIN products ON products.id= order_items.product_id JOIN suppliers ON suppliers.id=products.supplier_id  WHERE customer_id = $1";
                    pool.query(queryGetCustomers, [customerId] ,( error , result) => {
                        res.json(result.rows)   
                    })
                  }else{
                      res.send(`The id ${customerId} does not exist`)
                  }
              }) 
              .catch(e => res.send(e))
   }else{
       res.send(`The value ${req.params.customerId} is not a number`)
   }
}) 



app.listen(3000, () => console.log("Server is up and running"))
