const inquirer = require('inquirer');
const pool = require('./db/connection');
const queries = require('./db/queries');
const chalk = require('chalk');
const consoleTable = require('console.table');

async function mainMenu() {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: chalk.blue('What would you like to do?'),
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);

    switch (choice) {
        case 'View all departments':
            return queries.viewDepartments(mainMenu);
        case 'View all roles':
            return queries.viewRoles(mainMenu);
        case 'View all employees':
            return queries.viewEmployees(mainMenu);
        case 'Add a department':
            return queries.addDepartment(mainMenu);
        case 'Add a role':
            return queries.addRole(mainMenu);
        case 'Add an employee':
            return queries.addEmployee(mainMenu);
        case 'Update an employee role':
            return queries.updateEmployeeRole(mainMenu);
        default:
            pool.end();
            console.log(chalk.green('Goodbye!'));
    }
}

mainMenu();
