#!/usr/bin/env node

const { readFile } = require('fs/promises');
const { resolve } = require('path');

const { Command } = require('commander');
const program = new Command();

program
.name('Task Tracker')
.description('A CLI tool built to help you track your tasks!')
    .version('1.0.0');

    // CLI commands
program
    .command('add')
    .description('add a new task')
    .action(async () => {
        try{
            const filePath = resolve('C:/Users/guilherme.souza/Documents/ESTUDO/node/taskTracker/test.json');
            const contents = await readFile(filePath, { encoding : 'utf8'});
            const json = JSON.parse(contents);
            console.log(json);
        }
        catch(err){
            console.error(err.message);
        }
    });


program.parse(process.argv);

const options = program.opts();

// ADD
// generate a random ID
// allow user to add a description
// allow user to add a status
// save the date of the creation
// track the last update of the task - default is 'none'