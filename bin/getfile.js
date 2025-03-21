const { readFile } = require('fs/promises');
const { resolve } = require('path');

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

module.exports = getFile;