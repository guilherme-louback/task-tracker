#!/usr/bin/env node
// Make the Script Executable
// This shebang line tells the system to execute the script using Node.js.

const { writeFile } = require('fs/promises');
const { Command, Option } = require('commander');
const { randomUUID } = require('crypto');
const getFile = require('./getfile.js');

const program = new Command();

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
    .addOption(new Option('-s, --status <status>', 'define the task status', 'todo').choices(['todo', 'in-progress', 'done']))
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
                console.log(`Task added successfully (ID: ${json.tasks.at(-1).id})`);
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
                console.log(`Task added successfully (ID: ${json.tasks.at(-1).id})`);    
            }
        }
        catch(err){
            console.error(err.message);
        }
    });

program
    .command('update')
    .description('update task description')
    .argument('<id>', 'task id')
    .argument('<new description>', 'new task description')
    .action(async () => {
        try{
            const json = await getFile();
            console.log(json);
        } 
        catch(err){
            console.error(err.message);
        }
    });

program
    .command('delete')
    .description('deletes a task')
    .argument('<id>', 'task id')
    .action(async (taskId) => {
        try{
            const json = await getFile();
            for(let i = 0; i <= json.tasks.length - 1; i++){
                if(json.tasks[i].id == taskId){
                    json.tasks.splice(i, 1);
                    break
                } else if (i == json.tasks.length - 1){
                    console.log(`task with ID ${taskId} not found!`)
                }
            }
            jsonString = JSON.stringify(json);
            await writeFile('C:/Users/guilherme.souza/Documents/ESTUDO/node/taskTracker/test.json', jsonString);
        }
        catch(err){
            console.error(err);
        }
    });

program.parse(process.argv);
