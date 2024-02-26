const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// index.js

const employees = [];

const questions = [
  {
    type: 'input',
    name: 'name',
    message: "Enter team manager's name:",
  },
  {
    type: 'input',
    name: 'id',
    message: "Enter team manager's ID:",
  },
  {
    type: 'input',
    name: 'email',
    message: "Enter team manager's email:",
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: "Enter team manager's office number:",
  },
  {
    type: 'list',
    name: 'menuOption',
    message: 'What would you like to do?',
    choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],
  },
];

function promptUser() {
  inquirer.prompt(questions).then(answers => {
    switch (answers.menuOption) {
      case 'Add an engineer':
        promptEngineer();
        break;
      case 'Add an intern':
        promptIntern();
        break;
      case 'Finish building the team':
        generateHTML();
        break;
    }
  });
}

function promptEngineer() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Enter engineer's name:",
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter engineer's ID:",
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter engineer's email:",
    },
    {
      type: 'input',
      name: 'github',
      message: "Enter engineer's GitHub username:",
    }
  ]).then(answers => {
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    employees.push(engineer);
    promptUser();
  });
}

function promptIntern() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Enter intern's name:",
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter intern's ID:",
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter intern's email:",
    },
    {
      type: 'input',
      name: 'school',
      message: "Enter intern's school:",
    }
  ]).then(answers => {
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    employees.push(intern);
    promptUser();
  });
}

function generateHTML() {
  const renderedHTML = render(employees);
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, renderedHTML);
  console.log('Team profile successfully generated!');
}

// Start by prompting for the team manager's information
promptUser();
