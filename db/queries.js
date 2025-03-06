const pool = require('./connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const queries = {
    viewDepartments: async (callback) => {
        const { rows } = await pool.query('SELECT * FROM department');
        console.table(rows);
        callback();
    },

    viewRoles: async (callback) => {
        const { rows } = await pool.query(
            `SELECT role.id, role.title, department.name AS department, role.salary 
             FROM role 
             JOIN department ON role.department_id = department.id`
        );
        console.table(rows);
        callback();
    },

    viewEmployees: async (callback) => {
        const { rows } = await pool.query(
            `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, 
                    role.salary, 
                    CONCAT(m.first_name, ' ', m.last_name) AS manager
             FROM employee e
             JOIN role ON e.role_id = role.id
             JOIN department ON role.department_id = department.id
             LEFT JOIN employee m ON e.manager_id = m.id`
        );
        console.table(rows);
        callback();
    },

    addDepartment: async (callback) => {
        const { name } = await inquirer.prompt([
            { type: 'input', name: 'name', message: 'Enter department name:' }
        ]);
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log(`Added department: ${name}`);
        callback();
    },

    addRole: async (callback) => {
        const { title, salary, department_id } = await inquirer.prompt([
            { type: 'input', name: 'title', message: 'Enter role title:' },
            { type: 'input', name: 'salary', message: 'Enter salary:' },
            { type: 'input', name: 'department_id', message: 'Enter department ID:' }
        ]);
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
        console.log(`Added role: ${title}`);
        callback();
    },

    addEmployee: async (callback) => {
        const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
            { type: 'input', name: 'first_name', message: 'Enter first name:' },
            { type: 'input', name: 'last_name', message: 'Enter last name:' },
            { type: 'input', name: 'role_id', message: 'Enter role ID:' },
            { type: 'input', name: 'manager_id', message: 'Enter manager ID (or leave blank):' }
        ]);
        
        // Debugging: Log the values entered by the user
        console.log(`Inserting Employee: ${first_name} ${last_name}, Role ID: ${role_id}, Manager ID: ${manager_id}`);

        // Run the SQL query to insert the employee
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
            [first_name, last_name, role_id, manager_id || null]);
        
        console.log(`Added employee: ${first_name} ${last_name}`);
        callback();
    },

    updateEmployeeRole: async (callback) => {
        const { employee_id, new_role_id } = await inquirer.prompt([
            { type: 'input', name: 'employee_id', message: 'Enter employee ID:' },
            { type: 'input', name: 'new_role_id', message: 'Enter new role ID:' }
        ]);
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [new_role_id, employee_id]);
        console.log(`Updated employee role`);
        callback();
    }
};

module.exports = queries;

