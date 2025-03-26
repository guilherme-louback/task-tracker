const { writeFile } = require('fs/promises');

async function updateFile(jsonFile){
    try {
        jsonString = JSON.stringify(jsonFile);
        await writeFile('./data/task.json', jsonString);
    } catch(err){
        console.error(err);
    }
}

module.exports = updateFile;