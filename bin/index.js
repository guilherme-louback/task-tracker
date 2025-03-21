#!/usr/bin/env node

const { readFile, writeFile } = require('fs/promises');
const { resolve } = require('path');
const { Command } = require('commander');
const { randomUUID } = require('crypto');

const program = new Command();

async function getFile(){
    try{
        const filePath = resolve('C:/Users/guilherme.souza/Documents/ESTUDO/node/taskTracker/test.json');
        const contents = await readFile(filePath, { encoding : 'utf8' });
        const json = JSON.parse(contents);
        return json;
    }
    catch(err){
        console.error(err);
    }
}

program
    .name('Task Tracker')
    .description('A CLI tool built to help you track your tasks!')
    .version('1.0.0');

    // CLI commands
program
    .command('list')
    .description('list all tasks')
    .option('-i, --id', 'shows the task id')
    .action(async (options) => {
        try{
            const json = await getFile();
            if(options.id){
                for(let i = 0; i <= json.tasks.length - 1; i++){
                    console.log(json.tasks[i].description + `\nID: ${json.tasks[i].id}`);
                }
            } else {
                for(let i = 0; i <= json.tasks.length - 1; i++){
                    console.log(json.tasks[i].description);
                }
            }
        }
        catch(err){
            console.error(err.message);
        }
    });

program
    .command('add')
    .description('add new tasks')
    .argument('<description>', 'task description')
    .option('-s, --status <status>', 'define the task status')
    .action(async (argument, options) => {
        try{
            if(options.status){
                const json = await getFile();
                json.tasks.push(
                    {
                        id: randomUUID(),
                        description: argument,
                        status: `${options.status}`,
                        createdAt: new Date().toLocaleString(),
                        updatedAt: "none"
                    }
                );
                jsonString = JSON.stringify(json);
                await writeFile('C:/Users/guilherme.souza/Documents/ESTUDO/node/taskTracker/test.json', jsonString);
            } else {
                const json = await getFile();
                json.tasks.push(
                    {
                        id: randomUUID(),
                        description: argument,
                        status: "todo",
                        createdAt: new Date().toLocaleString(),
                        updatedAt: "none"
                    }
                );
                jsonString = JSON.stringify(json);
                await writeFile('C:/Users/guilherme.souza/Documents/ESTUDO/node/taskTracker/test.json', jsonString);
                console.log(jsonString);    
            }
        }
        catch(err){
            console.error(err.message);
        }
    });


program.parse(process.argv);

// ADD
// generate a random ID
// allow user to add a description
// allow user to add a status
// save the date of the creation
// track the last update of the task - default is 'none'