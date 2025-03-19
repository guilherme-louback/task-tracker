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
    .command('list')
    .description('List all tasks')
    .action(async () => {
        try{
            const filePath = resolve('C:/Users/guilherme.souza/Documents/ESTUDO/node/taskTracker/test.json');
            const contents = await readFile(filePath, { encoding : 'utf8'});
            const json = JSON.parse(contents);
            for(let i = 0; i <= json.tasks.length - 1; i++){
                console.log(json.tasks[i].description);
            }
        }
        catch(err){
            console.error(err.message);
        }
    });


program.parse(process.argv);

const options = program.opts();
