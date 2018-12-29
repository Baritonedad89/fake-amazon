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
    makeConnection()
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
                getSalesByDepartment()
                break;
            case "Create New Department":
                // run function
                break;
            case "Exit":
                connection.end()
                console.log('\nExited\n')
                break;
        }
    })
};
beSupervisor()

const getSalesByDepartment = () => {
    const query = "select distinct \
    a.department_id, \
    a.department_name, \
    a.over_head_costs, \
    b.product_sales \
    from departments a \
    left join products b \
    on a.department_name = b.department_name"

    connection.query(query, function (err, res) {
        console.log(res)
        

        // res.forEach(result => {
        //     let totalProfit = result.over_head_costs - result.product_sales
        //     if(totalProfit === result.over_head_costs){
        //         totalProfit = 0;
        //     }
        //     console.table([
        //         {
        //             department_id: `${result.department_id}`,
        //             department_name: `${result.department_name}`,
        //             over_head_costs: `${result.over_head_costs}`,
        //             product_sales: `${result.product_sales}`,
        //             total_profit: `${totalProfit}`
        //         }
        //     ]);   


        // })
                

    })
}
