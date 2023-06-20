const inquirer = require("inquirer");
const questions = require('./javascript/questions.js')
const table = require("console.table");
const logo = require("asciiart-logo");
const mysql = require('mysql');
// added a comment


//server connection
const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
    password: 'password',
    database: 'employeeDB',
});
  
connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    
});



//greeting message displayed in the beginning
welcome_message =()=> {
    console.log(
        logo({
            name: "Dipti's Employee Management System",
            lineChars: 12,
            textColor: 'white',
            margin: 3,
            borderColor: 'red',
            logoColor: 'bold-green',
            
            
        })
        .render()//let’s you pass in a template and the element to render it into
    );
}
//functions for Questions popping after the welcome message is displayed
async function begin(){ 
    const your_answer = await inquirer.prompt(questions.quest);
    switch (your_answer.start) {
        case "Add an employee to the team":    
            new_emp();  
            break;
        case "Add a department to the team":
            add_dept(); 
            break;
        case "Add a role to the team":
            add_role(); 
            break;
        case "View the departments of the team":  // working
            view_dept();
            break;
        case "View the employees of the team":
            view_emp();
            break;
        
        case "View all the roles of the team": 
            all_roles();
            break;
        case "Update the employee's role in the team": 
            up_role();
            break;
        case "Update the employee's Manager":
            up_man();                            
            break;
        case "View employees by their manager": 
            emp_man();
            break;
        case "View employees by their department": 
            emp_dept();
            break;
        case "Delete an employee":
            del_emp(); 
            break;
        case "Delete a role": 
            del_role();
            break;
        case "Delete a department":
            del_dept();// create
            break;
        case "Total budget of a department":
            view_bud();
            break;
        case "Quit":  
           connection.end();
            break;
       
    }

}
// adding employees, departments and roles

async function new_emp(){
    let emp_value = "SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee"
    connection.query(emp_value, async (err, employees) => {
        emp_value = "SELECT id as value, title as name FROM emprole"
        connection.query(emp_value, async (err, emproles) => {
            const employee_new  = await inquirer.prompt(questions.new_emp(emproles, employees));
            emp_value= "INSERT INTO employee SET ?"
            connection.query(emp_value, employee_new,(err) =>{
                if (err) throw err;
                console.log("New employee has been added to your team!");
                console.table(employee_new);
                
                begin()
            });
        })
    })
}// after adding run the view employee function or refresh your sql code to check the updated list of employees with your addition

async function add_dept() {
    const quest_dept = await inquirer.prompt(questions.dept_quest)
    connection.query("INSERT INTO department SET ?", {
            dept_name: quest_dept.depart_name
        },
        function (err) {
            if (err) throw err;
            console.log("New department has been added to your team!");
            console.table(quest_dept);
           
            begin()
        }
    );
}// after adding run the view department function or refresh your sql code to check the updated list of departments with your addition


async function add_role() {
    const roleDetails = await inquirer.prompt(questions.new_role)
    connection.query("INSERT INTO emprole SET ?", {
            title: roleDetails.title_r,
            salary: roleDetails.salary_r,
            department_id: roleDetails.id_r
            
        },
        function (err) {
            if (err) throw err;
            console.log("New Role has been added to your team!");
            console.table(roleDetails);
           
            begin()
        }
    );
} 
//-----------------------------------------------------------------------------------//

//view departments, employees,,roles, view employee by - only roles, only managers and only departments

view_dept=() =>{
    connection.query("SELECT * FROM department", (err, res)=> {
        if (err) throw err;
        console.table(res);
        begin()
    });
}

view_emp=()=> {
    connection.query("SELECT employee.first_name, employee.last_name, emprole.title, emprole.salary, department.dept_name AS department FROM employee LEFT JOIN emprole ON employee.role_id = emprole.id LEFT JOIN department ON emprole.department_id = department.id", function (err, res) {
        if (err) throw err;   
        console.table(res);
        begin()
    });
}

all_roles=() =>{
    connection.query("SELECT title FROM emprole", (err, res) =>{
        if (err) throw err;
        console.table(res);
        begin()
    });
}

async function emp_man () {
    connection.query("SELECT * FROM employee", async (err, employee) => {
        const {
            managerid
        } = await inquirer.prompt([{
            type: "list",
            message: "Choose a manager:",
            name: "managerid",
            choices: () => {
                return employee.map((manager) => manager.manager_id);
            },
        }, ]);
        connection.query(`SELECT first_name, last_name FROM employee WHERE manager_id=${managerid}`, function (err, res) {
            if (err) throw err;

            console.table(res);
            begin();
        });
    })
}
  
   

async function emp_dept() {
    connection.query("SELECT * FROM department", async (err, department) => {
        const {
            departmentName
        } = await inquirer.prompt([{
            type: "list",
            message: "Select a Department:",
            name: "departmentName",
            choices: () => {
                return department.map((department) => department.dept_name);
            }
        }]);
        connection.query("SELECT employee.first_name, employee.last_name, emprole.title, emprole.salary, department.dept_name AS department FROM employee LEFT JOIN emprole ON employee.role_id = emprole.id LEFT JOIN department ON emprole.department_id = department.id", function (err, res) {
            if (err) throw err;
            console.log("You can now view your employees by their department!");
            console.table(res.filter((name) => departmentName === name.department));
            begin();
        });
    })
}

//-----------------------------------------------------------------------------------//

//All the updates

function up_role() {
    inquirer.prompt([
        {
            message: "Enter the first name of the employee  you  would like to update? ",
            type: "input",
            name: "name"
        }, {
            message: "Enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        console.log("Role has been updated! Run the view department function or refresh your sql code to check the updated list of roleswith your addition")
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
           
            console.table(data);
            
    
        })
        begin();
    })

}


function up_man() {
    inquirer.prompt([
        {
            message: "Enter the first name of the employee for who you would like to  make the update? ",
            type: "input",
            name: "name"
        }, {
            message: "Enter the id of the new Manager:",
            type: "number",
            name: "manager_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET manager_id = ? WHERE first_name = ?", [response.manager_id, response.name], function (err, data) {
            console.log("\nNew Manager has been updated for the employee! Run the view the employee's  by their manager function or refresh your sql code to check the updated list with your addition"); 
            console.table(data);
    
        })
        begin();
    })

}



  
//-----------------------------------------------------------------------------------//
// Deleting functions


// TRIED DOING IT, WILL UPDATE IT MORE
async function del_role() {
    const roleDetails = await inquirer.prompt(questions.removeRole)
    connection.query("DELETE FROM emprole WHERE ?", {
            title: roleDetails.roleRemoval
            
        },
        function (err) {
            if (err) throw err;
            console.log("Role has been deleted from your team!");
            console.table(roleDetails);
           
            begin()
        }
    );
} 



// TRIED DOING IT, WILL UPDATE IT MORE
async function del_emp() {
    const roleDetails = await inquirer.prompt(questions.removeEmployee)
    connection.query("DELETE FROM employee WHERE ?", {
<<<<<<< HEAD
            id: roleDetails.roleid
=======
            title: roleDetails.employeeRemoval
>>>>>>> parent of db4064a (Updated Delete employee function)
            
        },
        function (err) {
            if (err) throw err;
            console.log("Role has been deleted from your team!");
            console.table(roleDetails);
           
            begin();
        }
    );
} 


//updated the function

async function del_dept() {
    const roleDetails = await inquirer.prompt(questions.removedept)
    connection.query("DELETE FROM department WHERE ?", {
            dept_name: roleDetails.deptRemoval
            
        },
        function (err) {
            if (err) throw err;
            console.log("Department has been deleted from your team!");
            console.table(roleDetails);
           
            begin();
        }
    );
} 
//-----------------------------------------------------------------------------------//
const view_bud = ()=> {
   
    connection.query("SELECT emprole.department_id AS id,department.dept_name AS department, SUM(salary) AS Budget FROM emprole INNER JOIN department ON emprole.department_id = department.id GROUP BY  emprole.department_id", (err, res) => {
            if (err) throw err;
            console.table(res);
            begin();
        
         
        }
    );
}

welcome_message()
begin();

