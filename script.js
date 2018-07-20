/* remind yourself: 
    what is being hoisted?
    what are scoping considerations? 
    how similar to functional programming is this?
    how much is part of NodeJS ( like inquirer, filter )?
    fat arrow functions and new context
    awync and await
*/

// some node imports that are reflected in our dependencies from the package.json
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");

const introduction = () => {
    console.log(
        chalk.green(
            figlet.textSync("Like a night-light in the dark", {
                font: "Ghost",
                horizontalLayour: "controlled smushing",
                verticalLayout: "default"
            })
        )
    );
};

// define queries for the users
const askQuestions = () => {
    const questions = [
        {
            name: "FILENAME",
            type: "input",
            message: "What is the name of the file without extension?"
        },
        {
            type: "list",
            name: "EXTENSION",
            choices: [".md", ".js", ".css", ".csv"],
            filter: function(val) {
                return val.split(".")[1];
            }
        }
    ];
    return inquirer.prompt(questions);
};

// JS is case sensitive. So, these filename and extension are different from FILENAME and EXTENSION. this means filename and extension are parameters, and when createFile is called later, it takes in FILENAME and EXTENSION as parameters
const createFile = (filename, extension) => {
    // cwd = current working directory? cwd method from Node seems to return a string
    const filePath = `${process.cwd()}/${filename}.${extension}`
    //is it really this easy to access the terminal/shell? this is awesome
    shell.touch(filePath);
    return filePath
};

// create an arrow function taht takes in the new filepath and console.logs it with the fancy chalk font module.
const success = (filepath) => {
    console.log(
        chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
    );
}


// at the bottom, here is the initialization of the whole thing
const run = async () => {
    //display fancy text intro
    introduction();

    //query users
    const answers = await askQuestions();
    // create new constants FILENAME and EXTENSION with object destructuring and the return value from the askQuestions()
    const { FILENAME, EXTENSION } = answers;

    //create file with yout concatenated filename
        // PASS THe new file information into your hoisted createFile() method. createFile() will return a value, that filePath is then given. So is this imperative? Functional?
    const filePath = createFile(FILENAME, EXTENSION);

    success(filePath);

};


run();