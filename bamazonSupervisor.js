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
        // console.log("connected as id " + connection.threadId + "\n");

    });
};

const beSupervisor = () =>{
    inquirer.prompt([
        message: "\nMenu options:\n",
        type: "list",
        name: "options",
        choice: ["View Product Sales by Department", "Create New Department", "Exit"]
    ]).then(response => {
        switch(response.options) {
            case "View Product Sales by Department":
            // run function
            break;
            case "Create New Department":
            // run function
            break;
            case "Exit":
            // run function
            break;
        }
    })
};

const getSalesByDepartment =()=>{
    const query = "SELECT "
}
