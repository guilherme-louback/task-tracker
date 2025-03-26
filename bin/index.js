#!/usr/bin/env node
// Make the Script Executable
// This shebang line tells the system to execute the script using Node.js.

const { Command, Option } = require('commander');
const { randomUUID } = require('crypto');
const getFile = require('./getfile.js');
const updateFile = require('./updatefile.js');
const program = new Command();

program
    .name('Task Tracker')
    .description('A CLI tool built to help you track your tasks!')
    .version('1.0.0');

    // CLI commands
program
    .command('list')
    .description('list all tasks')
    .option('-i, --id', 'show the task id')
    .option('-t, --todo', 'show all the tasks to do')
    .option('-p, --inprogress', 'show all the tasks in progress')
    .option('-d, --done', 'show the tasks done')
    .action(async (options) => {
        try{
            const json = await getFile();
            if(options.id){
                for(let i = 0; i <= json.tasks.length - 1; i++){
                    console.log(json.tasks[i].description + `\nID: ${json.tasks[i].id}`);
                }
            } else if(options.todo){
                for(let i = 0; i <= json.tasks.length - 1; i++){
                    if(json.tasks[i].status === 'todo'){
                        console.log(json.tasks[i].description + `\nID: ${json.tasks[i].id}`);
                    }
                }
            } else if(options.inprogress){
                for(let i = 0; i <= json.tasks.length - 1; i++){
                    if(json.tasks[i].status === 'in-progress'){
                        console.log(json.tasks[i].description + `\nID: ${json.tasks[i].id}`);
                    }
                }
            } else if(options.done){
                for(let i = 0; i <= json.tasks.length - 1; i++){
                    if(json.tasks[i].status === 'done'){
                        console.log(json.tasks[i].description + `\nID: ${json.tasks[i].id}`);
                    }
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
                updateFile(json);
                console.log(`Task added successfully (ID: ${jsonFile.tasks.at(-1).id})`);
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
                await updateFile(json);
                console.log(`Task added successfully (ID: ${jsonFile.tasks.at(-1).id})`);    
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
    .action(async (taskId, taskDescription) => {
        try{
            const json = await getFile();
            for(let i = 0; i <= json.tasks.length - 1; i++){
                if(json.tasks[i].id == taskId){
                    json.tasks[i].description = taskDescription;
                    break
                } else if (i == json.tasks.length - 1){
                    console.log(`task with ID ${taskId} not found!`)
                }
            }
            await updateFile(json);
        }
        catch(err){
            console.error(err);
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
            await updateFile(json);
        }
        catch(err){
            console.error(err);
        }
    });

program
    .command('mark-in-progress')
    .description('change a task status to in-progress')
    .argument('<id>', 'task id')
    .action(async (taskId) => {
        try{
            const json = await getFile();
            for(let i = 0; i <= json.tasks.length - 1; i++){
                if(json.tasks[i].id === taskId){
                    if(json.tasks[i].status === "in-progress"){
                        console.log(`task status is already 'in-progress'`);
                        break;
                    }
                    json.tasks[i].status = "in-progress";
                    json.tasks[i].updatedAt = new Date().toLocaleString();
                    break;
                } else if (i == json.tasks.length - 1){
                    console.log(`ID: ${taskId} não encontrado!`)
                }
            }
            await updateFile(json);
        }
        catch(err){
            console.error(err);
        }
    });

program
    .command('mark-done')
    .description('change a task status to done')
    .argument('<id>', 'task id')
    .action(async (taskId) => {
        try{
            const json = await getFile();
            for(let i = 0; i <= json.tasks.length - 1; i++){
                if(json.tasks[i].id === taskId){
                    if(json.tasks[i].status === "done"){
                        console.log(`task status is already 'done'`);
                        break;
                    }
                    json.tasks[i].status = "done";
                    json.tasks[i].updatedAt = new Date().toLocaleString();
                    break;
                } else if (i == json.tasks.length - 1){
                    console.log(`ID: ${taskId} não encontrado!`)
                }
            }
            await updateFile(json);
        }
        catch(err){
            console.error(err);
        }
    });
program.parse(process.argv);
