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

const prompts = () => {
    inquirer.prompt([
        {
            message: "Which item would you like to purchase (provide ID #)?",
            type: "input",
            name: "purchase",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                }
                return true;
            }
        },
        {
            message: "How many units would you like to purchase?",
            type: "input",
            name: "quantity",
            validate: function (value) {
                if (isNaN(value)) {
                    return false
                }
                return true;
            }
        }

    ]).then(response => {
        let userProduct = response.purchase;
        let userQuantity = parseFloat(response.quantity);

        const query = `SELECT product_name, stock_quantity, price FROM products WHERE item_id =${userProduct}`;
        connection.query(query, function (err, res) {
            for (let i = 0; i < res.length; i++) {
                const p = res[i].price;
                const r = res[i].stock_quantity;
                if (userQuantity > r) {
                    console.log("Insufficient quantity");
                    prompts();
                } else {
                    let newQuantity = r - userQuantity;
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQuantity
                            },
                            {
                                item_id: userProduct

                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            const total = userQuantity * p;
                            console.log(`\nPurchase Completed.\nTotal Cost: $${total}`);
                            connection.end();
                        }


                    )
                }
            }




        })




    });
}

const getItemsForSale = () => {
    makeConnection()
    const query = "SELECT item_id, product_name, price FROM products";
    console.log("\nPRODUCTS FOR SALE:\n");
    connection.query(query, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            const products = res[i];
            const productsList = `id# ${products.item_id} - ${products.product_name}, $${products.price}`
            console.log(productsList)
        }
        console.log('---------------------------------------------------------')
    })
    setTimeout(prompts, 1000)
};
getItemsForSale();


