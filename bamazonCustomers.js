const mysql = require('mysql');
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Baritone2018*",
    database: "bamazon"
});

const makeConnection = () => {
    connection.connect(err => {
        if (err) throw err;
    });
};

const getItemsForSale = () => {
    makeConnection()
    const query = "SELECT item_id, product_name, price FROM products";
    console.log("Products for sale: \n");
    connection.query(query, function (err, res) {
        for(let i=0; i<res.length; i++){
            const products = res[i];
            const productsList = `${products.item_id} - ${products.product_name} | Price: $${products.price}`
            console.log(productsList)

        }
    })
};

getItemsForSale()
