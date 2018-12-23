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
        console.log("connected as id " + connection.threadId + "\n");
    });
};


const createManager = () => {
    makeConnection();
    console.log("\nWelcome to the manager portal\n");
    setTimeout(prompt, 500)
};

const prompt = () => {
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
        }

    })
    // use these credentials to sign in to the portal and run that function 
};
createManager();


const signIntoPortal = () => {

}