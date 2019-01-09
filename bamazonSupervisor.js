const mysql = require('mysql');
const inquirer = require("inquirer");
const cTable = require('console.table');
const { table } = require('table');


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



const beSupervisor = () => {
    inquirer.prompt([
        {
            message: "\nMenu options:\n",
            type: "list",
            name: "options",
            choices: ["View Product Sales by Department", "Create New Department", "Exit"]
        }
    ]).then(response => {

        switch (response.options) {
            case "View Product Sales by Department":
                getSalesByDept()
                break;
            case "Create New Department":
                createNewDept()
                break;
            case "Exit":
                connection.end()
                console.log('\nExited Supervisor\n')
                break;
        }
    })
};
beSupervisor()

// I did things a little different in order to accomplish this. In my products table instead of naming each department 
// I made sort of a foreign key so that the department ID from the department table corresponds with the department ID
// in the products table 
const getSalesByDept = () => {
    const query = `
    SELECT 
	d.department_id,  
    d.department_name, 
    d.over_head_costs, 
	IFNULL(sum(p.product_sales), 0) AS product_sales,
	IFNULL(sum(p.product_sales), 0) - IFNULL(d.over_head_costs, 0) AS total_profit
    FROM departments d
    LEFT JOIN products p
    ON d.department_name = p.department_name
    GROUP BY d.department_id;`

    connection.query(query, function (err, res) {
        console.log('\n---------------------------Product Sales by Department----------------------------\n')
        console.table(res)
    })
    setTimeout(beSupervisor, 1000);
}

const createNewDept = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter name of new department",
            name: "department"
        },
        {
            type: "input",
            message: "Enter over head costs",
            name: "over_head",
            validate: function (value) {
                if (isNaN(value)) {
                    return false;
                }
                return true;
            }
        }
    ]).then(response => {
        const department = response.department;
        const overHead = parseFloat(response.over_head);

        const query = `
        INSERT INTO departments (department_name, over_head_costs)
        VALUE("${department}", ${overHead})
        `
        connection.query(query, function (err, res) {
            const nextQuery = `SELECT * FROM departments`;
            connection.query(nextQuery, function (err, res) {
                console.log('\n-----------------Departments Table-----------------------\n')
                console.table(res);
            })
        })
        setTimeout(beSupervisor, 1000);
    })
}
