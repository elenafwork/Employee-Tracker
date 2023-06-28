INSERT INTO department(id, name)
VALUES (1, 'Sales'), (2, 'Engineering'),(3, 'Finance'), (4, 'Legal');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Sales Lead', 100000, 1),
(2,'Salesperson', 80000,1),
(3, 'Lead Engineer', 150000,2),
(4, 'Software Engineer', 120000, 2),
(5, 'Account Manager', 160000, 3),
(6, 'Accountant', 125000, 3),
(7, 'Legal Team Lead', 250000, 4),
(8, 'Lawyer', 190000, 4);

INSERT INTO employee(id, first_name, last_name, manager_id)
VALUES(1, 'John', 'Doe', null), (2, 'Mike', 'Chan', 1),
(3, 'Ashley', 'Rodriguez', null), (4, 'Kevin', 'Tupik', 3),
(5, 'Kunal', 'Singh', null), (6, 'Malia', 'Brown', 5),
(7, 'Sarah', 'Lourd', null),(8, 'Tom', 'Allen',7);