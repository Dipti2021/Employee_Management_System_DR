module.exports = {
    quest: { //initial Question
        type: "list",
        message: "Welcome to my Employee Management System. From where would you like to start today?",
        name: "start",//initial roles being displayed
        choices: ["Add an employee to the team",
            "Add a department to the team",
            "Add a role to the team",
            "View the departments of the team",
            "View the employees of the team",
            "View all the roles of the team",
            "Update the employee's role in the team",
            "Update the employee's Manager",
            "View employees by their manager",
            "View employees by their department",
            "Delete an employee",   
            "Delete a role",
            "Delete a department",
            "Total budget of a department",
            "Quit"
        ]
    },
    new_emp: (emproles, employees) => [{
            type: "input",
            message: "Enter the employee's first name?",
            name: "first_name",
        },
        {
            type: "input",
            message: "Enter the employee's last name?",
            name: "last_name",
        },
        {
            type: "list",
            message: "Enter the employee's role?",
            name: "role_id",
            choices: emproles // look for it again for updating the manager
            
        },
        {
            type: "list",
            message: "Enter the employee's manager?",// questions popping up again
            name: "manager_id",
            choices: employees
        }
    ],
    
    dept_quest: { //add Department Questions for the user
        type: "input",
        message: "Enter the name of your department?",
        name: "depart_name",
    },
    new_role: [{ //add Role for the user
            type: "input",
            message: "Enter the title of your new role?",
            name: "title_r",  //title Role for the user
        },
        {
            type: "input",
            message: "Enter the salary for this role?",
            name: "salary_r",
        },
        {
            type: "input",
            message: "Enter the department id for this role?",
            name: "id_r",  // dept_id, //departmentIDrole changed as not working
        }
    ],
   /* up_role: (employees, emproles) => [{
    
        type: "list",
        message: "Enter the employee's role?",
        name: "role_id",
        choices: employees // look for it again for updating the manager
        
    },
    {
        type: "list",
        message: "Enter the employee's new role?",// questions popping up again
        name: "title_new",
        choices: employees
    }
    ],*/
    removeRole: {
        type: "list",
        message: "Enter the employee's role? that you want to delete",
        name: "roleRemoval",
        choices: ["Director", "Analyst", "Programmer"]
    },
   
    removeEmployee: {
        type: "list",
        message: "Enter the employee's role?",
        name: "employeeRemoval",
        choices: ["Director", "Analyst", "Programmer"]
    },

    removedept: {
        type: "list",
        message: "Enter the department name you want to delete?",
        name: "deptRemoval",
        choices: ["IT", "FINANCE", "R&D"]
    },
    
}

