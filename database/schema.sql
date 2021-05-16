
DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;


CREATE TABLE department (
 id INTEGER AUTO_INCREMENT NOT NULL,
 dept_name VARCHAR(100) NOT NULL, -- department_name-- to hold department name
 PRIMARY KEY (id)
);

CREATE TABLE emprole (-- roles
 id INTEGER AUTO_INCREMENT NOT NULL,
 title  VARCHAR(100) NOT NULL, -- to hold role title
 salary  DECIMAL(10,2) NULL, -- to hold role salary     
 department_id INTEGER NOT NULL, -- to hold reference to department role belongs to
 FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE, -- to undo the foreign key
 PRIMARY KEY (id)
);

CREATE TABLE employee(
 id INTEGER AUTO_INCREMENT NOT NULL,
 first_name  VARCHAR(100) NOT NULL, -- to hold employee first name
 last_name  VARCHAR(100) NOT NULL, -- to hold employee last name
 role_id INTEGER NOT NULL, -- to hold reference to role employee has
 manager_id INTEGER NOT NULL, -- to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
FOREIGN KEY (role_id) REFERENCES emprole(id) ON DELETE CASCADE,-- holds the foreign key for the role id
 FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE,-- holds the foreign key for the manager id
 PRIMARY KEY (id)
);



