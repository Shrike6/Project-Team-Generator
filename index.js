const fs = require('fs');
const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const htmlGenerator = require('./src/template-helper-code');
const path = require('path');
const OUTPUT_DIR = path.resolve(_dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'teammates.html');
let teammates = [];


// Creates prompts to make the team
const managerPrompt = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your employee ID?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?',
        },
        {
            type: 'input',
            name: 'officenumber',
            message: 'What is your office number?',
        },
    ]).then(answers => {
        console.log(answers);
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        teammates.push(manager);
        promptMenu();
    })
}

const promptMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'Please choose an option.',
            choices: ['add engineer', 'add intern', 'finish building team']
        }
    ])
    .then(userChoice => {
        switch (userChoice.menu) {
            case 'add engineer':
                engineerPrompt();
                break;
            case 'add intern':
                internPrompt();
                break;
            default 'finish building team':
                teamBuilder();

        }
    })
}

const engineerPrompt = () => {
    console.log('Add an Engineer');
    
    return iquirer.prompt([
        {
            type:'input',
            name:'name',
            message:'What is the engineer\'s name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is their employee ID?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email address?',
        },
        {
            type: 'input',
            name: 'gitHub',
            message: 'What is their Github name?',
        },

    ]).then(answers => {
        console.log(answers);
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.gitHub);
        teamMembers.push(engineer);
        promptMenu();
    })
}

const internPrompt = () => {
    console.log('Add an intern');
    
    return iquirer.prompt([
        {
            type:'input',
            name:'name',
            message:'What is the intern\'s name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is their employee ID?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email address?',
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the name of their school?',
        },
    ]).then(answers => {
        console.log(answers);
        const engineer = new Intern(answers.name, answers.id, answers.email, answers.gitHub);
        teamMembers.push(intern);
        promptMenu();
    })
}

// Creates directory for html file if it doesn't exist
const teamBuilder = () => {
    console.log('Finish building the team');

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, htmlGenerator(teammates), 'utf-8');
}

managerPrompt();