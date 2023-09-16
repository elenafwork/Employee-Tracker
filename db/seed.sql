INSERT INTO department( name)
VALUES ( 'Sales'), ('Engineering'),('Finance'), ('Legal');
SELECT * FROM department;

INSERT INTO role ( title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
('Salesperson', 80000,1),
( 'Lead Engineer', 150000,2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);
SELECT * FROM role;

INSERT INTO employee(first_name, last_name, manager_id)
VALUES( 'John', 'Doe', null), ( 'Mike', 'Chan', 1),
( 'Ashley', 'Rodriguez', null), ( 'Kevin', 'Tupik', 3),
( 'Kunal', 'Singh', null), ( 'Malia', 'Brown', 5),
( 'Sarah', 'Lourd', null),( 'Tom', 'Allen',7);
SELECT * FROM employee;