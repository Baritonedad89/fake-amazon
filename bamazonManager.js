const mysql = require('mysql');
const inquirer = require("inquirer");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Baritone2018*",
    database: "manager_profiles"
});



const makeConnection = () => {
    connection.connect(err => {
        if (err) throw err;
        // console.log("connected as id " + connection.threadId + "\n");
    });
};

const connectionTwo = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Baritone2018*",
    database: "bamazon"
});

const makeConnectionTwo = () => {
    connectionTwo.connect(err => {
        if (err) throw err;
        // console.log("connected as id " + connection.threadId + "\n");

    });
};


const createManager = () => {
    console.log("\nWelcome to the Manager Profile Creation Portal\n");
    setTimeout(prompt, 500)
};

const create = () => {
    console.log("\nLet's set you up for a new Manager profile");
    console.log('-------------------------------------------')
    inquirer.prompt([
        {
            message: "Please enter your first name:",
            type: "input",
            name: "firstName",
            // validate: function (value) {
            //     const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            //     for (let i = 0; i < value.length; i++) {
            //         for (let j = 0; j < number.length; j++) {
            //             if(value[i] === number[j]) {
            //                 return false;
            //         }
            //         return true;

            //     }
            //     }
            // }
        },
        {
            message: "Please enter your last name:",
            type: "input",
            name: "lastName",
            // validate: function (value) {
            //     if (!isNaN(value)) {
            //         return false;
            //     }
            //     return true;
            // }
        },
        {
            message: "Please create a user name.",
            type: "input",
            name: "userName",
            validate: function (value) {
                if (value.length <= 5) {
                    console.log('\nUsername must be at least 6 characters long')
                    return false;
                } return true;
            }
        },
        {
            message: "Please set up a password.",
            type: "password",
            mask: '*',
            name: "password",
            validate: function (value) {
                if (value.length < 8) {
                    console.log('\nPassword must be at least 8 characters long')
                    return false;
                } return true;
            }
        },
        {
            message: "Would you like to proceed with creating your Manager profile?",
            type: "confirm",
            name: "confirm"
        }
    ]).then(response => {
        if (response.confirm) {
            const query = connection.query(
                "INSERT INTO logins SET ?",
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    user_name: response.userName,
                    password: response.password
                },

                function (err, res) {
                    if (err) throw err;
                    console.log(`\nNew Manager profile created!\nThank you, ${response.firstName}!`)
                }
            )
            setTimeout(managerPortal, 1000)
        }

    })
};

const signIntoPortal = () => {
    console.log("\nSign into Manager's Portal");
    console.log('-------------------------------------------')
    inquirer.prompt([
        {
            type: "input",
            message: "Enter your user name",
            name: "userName",
            validate: function (value) {
                if (value.length <= 5) {
                    console.log('\nUsername must be at least 6 characters long')
                    return false;
                } return true;
            }
        },
        {
            type: "password",
            mask: '*',
            message: "Enter your password",
            name: "password",
            validate: function (value) {
                if (value.length < 8) {
                    console.log('\nPassword must be at least 8 characters long')
                    return false;
                } return true;
            }
        }
    ]).then(response => {
        const userName = response.userName;
        const password = response.password;
        let query = `SELECT first_name, last_name FROM logins WHERE user_name ="${userName}" AND password ="${password}"`;

        connection.query(query, function (err, res) {
            if (err) throw err;
            if (res.length < 1) {
                console.log('\nLogin credentials invalid.\nPlease check either user name or password and try again.\n');
                signIntoPortal()
            } else {
                for (let i = 0; i < res.length; i++) {
                    const validUser = res[i];
                    console.log('-------------------------------------------')
                    console.log(`\n${validUser.first_name} ${validUser.last_name} signed in.\n`)
                }
                portalMenu()
            }
        });
    })

};



const portalMenu = () => {
    inquirer.prompt([
        {
            message: "\nMenu Options:\n",
            type: "list",
            name: "menu",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit Portal"
            ]
        }
    ]).then(response => {
        switch (response.menu) {
            case "View Products for Sale":
                viewProducts()
                break;
            case "View Low Inventory":
                lowInventory()
                break;
            case "Add to Inventory":
                displayCurrentInventory()
                break;
            case "Add New Product":
                addProduct()
                break;
            case "Exit Portal":
                connection.end()
                connectionTwo.end();
                break;
        }
    })


};


const viewProducts = () => {
    const query = "SELECT item_id, product_name, price, stock_quantity FROM products";
    connectionTwo.query(query, function (err, res) {
        if (err) throw err;
        console.log('\n----------------------------------------Products for sale---------------------------------\n')
        for (let i = 0; i < res.length; i++) {
            let item = res[i];
            console.log(`id: ${item.item_id}, item: ${item.product_name}, price: $${item.price}, qty: ${item.stock_quantity}`)
            console.log('-----------------------------------------------------------------------')
        }
        setTimeout(portalMenu, 1000)
    })
};

const lowInventory = () => {
    const query = "SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 5";
    connectionTwo.query(query, function (err, res) {
        if (err) throw err;
        console.log('\n----------------------------------------Inventory below 5---------------------------------\n')
        for (let i = 0; i < res.length; i++) {
            let item = res[i];
            console.log(`item: ${item.product_name}`)
            console.log(`qty: ${item.stock_quantity}`)
            console.log('-----------------------------------------------------------------------')
        }
        setTimeout(portalMenu, 1000)
    })
};

const displayCurrentInventory = () => {
    const query = "SELECT item_id, product_name, stock_quantity FROM products";
    console.log("\n----------------------------Current Inventory------------------------\n");
    connectionTwo.query(query, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            const products = res[i];
            const productsList = `id# ${products.item_id} - ${products.product_name}, qty: ${products.stock_quantity}`
            console.log(productsList)
        }
        console.log('---------------------------------------------------------')
        setTimeout(addInventory, 500)
    });
}

const addInventory = () => {
    inquirer.prompt([
        {
            message: "Which item would you like to restock? (provide id #)",
            type: "input",
            name: "restock",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                }
                return true;
            }
        },
        {
            message: "How much would you like to add?",
            type: "input",
            name: "newQty",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                }
                return true;
            }
        }
    ]).then(response => {
        let newCurrentStock = "";
        let stock = "";
        let newStock = "";
        const query = `SELECT stock_quantity FROM products WHERE item_id ="${response.restock}"`;
        connectionTwo.query(query, function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                stock = res[i].stock_quantity;
            }
            newStock = parseInt(stock) + parseInt(response.newQty);

            connectionTwo.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newStock
                    },
                    {
                        item_id: response.restock
                    }
                ],
                function (err, res) {
                    if (err) throw err;
                    const query = `SELECT stock_quantity, product_name FROM products WHERE item_id ="${response.restock}"`;
                    connectionTwo.query(query, function (err, res) {
                        if (err) throw err;
                        for (let i = 0; i < res.length; i++) {
                            let productName = res[i].product_name;
                            newCurrentStock = res[i].stock_quantity;
                            console.log(`\nCurrent stock for "${productName}" is now ${newCurrentStock}.\n`);

                        }
                    });
                    setTimeout(portalMenu, 1000);
                }
            )

        });

    })

};

const addProduct = () => {
    inquirer.prompt([
        {
            message: "Enter product name",
            type: "input",
            name: "product"
        },
        {
            message: "Enter department name",
            type: "input",
            name: "department"
        },
        {
            message: "Enter price (xx.xx)",
            type: "input",
            name: "price",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                }
                return true;
            }
        },
        {
            message: "Enter quantity",
            type: "input",
            name: "quantity",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                }
                return true;
            }
        }
    ]).then(response => {
        connectionTwo.query(
            "INSERT INTO products SET ?",
            {
                product_name: response.product,
                department_name: response.department,
                price: response.price,
                stock_quantity: response.quantity
            },

            function (err, res) {
                if (err) throw err;
                console.log(`\n${response.quantity} ${response.product}'s added to inventory!\n`);
                setTimeout(portalMenu, 1000);
            }
        )

    });
}



const managerPortal = () => {
    console.log("Welcome to the Manager Portal.");
    console.log('---------------------------------');
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "option",
            choices: ["Create a new Manager profile", "Sign into portal", "Exit Portal"]
        }
    ]).then(response => {
        switch (response.option) {
            case "Create a new Manager profile":
                create();
                break;
            case "Sign into portal":
                signIntoPortal();
                break
            case "Exit Portal":
                connection.end();
                break;
        }
    })
};
managerPortal()
