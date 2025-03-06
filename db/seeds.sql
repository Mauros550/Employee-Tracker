INSERT INTO department (name) VALUES ('Engineering'), ('Finance'), ('Marketing');

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Accountant', 70000, 2),
('Marketing Manager', 75000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, NULL),
('Emily', 'Johnson', 3, NULL);
