USE employeeDB;

-- Creates new rows
INSERT INTO department (dept_name)
VALUES ("MANAGEMENT"),("FINANCE"), ("IT"),("R&D"),("MARKETING");
  
INSERT INTO emprole (title,salary, department_id)
VALUES ('President', 700000, 1),('CEO', 550000, 1),('CFO', 550000, 1),('Vice President', 470000, 1),('Director of Finance', 300000, 2),('Director of IT', 300000, 3),
('Director of R&D', 300000, 4),('Director of Marketing', 300000, 5),('Financial Analyst', 150000, 2),('Programming Manager', 150000, 3),('R&D Researcher', 100000, 4),
("Marketing Consultant", 100000, 5),("Computer Programmer", 100000, 3),('Sales Associate', 85000, 5),('Accountant', 67000, 2),('Secretary', 55000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Amitabh','Bachchan',1, 1),('Salman', 'Khan', 2, 1),('Ranveer', 'Singh', 3, 1), ('Katrina', 'Kaif', 4, 1), ('Emraan','Hashmi', 4, 1),('Sonu', 'Nigam', 4, 1), ('Tiger', 'Shroff', 5, 3 ),('Varun', 'Dhawan', 6, 1),('Alia', 'Bhatt', 7, 2),
('SailAli', 'Khan', 8, 4),('John', 'Abraham', 9, 3), ('Sushmita', 'Sen', 9, 3),('Priyanka', 'Chopra', 9, 3),('Akshay', 'Kumar', 10, 8 ), ('Sania', 'Malhotra', 10, 8),('Shahid', 'Kapoor', 10, 8),
('Hritik', 'Roshan', 10, 8),('Rajkumar', 'Rao', 11, 9),('Shakti', 'Kapoor', 11, 9), ('Amrish', 'Puri', 12, 8),('Aruna', 'Irani', 13, 9),('Johnny', 'Lever', 14, 20), ('Juhi', 'Chawla', 14, 20),('Rajpal', 'Yadav', 15, 7),('Madhuri', 'Dixit', 16, 1);

SELECT employee.first_name, employee.last_name, emprole.title,emprole.salary, department.dept_name, employee_m.first_name AS Manager_fame, employee_m.last_name AS Manager_lname
FROM employee JOIN emprole ON employee.role_id = emprole.id JOIN department ON emprole.department_id = department.id LEFT JOIN employee AS employee_m ON employee.manager_id = employee_m.id;
SELECT * FROM department;
SELECT * FROM emprole;
SELECT * FROM employee;
