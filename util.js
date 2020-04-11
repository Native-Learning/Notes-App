const fs = require('fs');

// Read file
const read = function (filePath) {
    console.log(fs.readFileSync(filePath).toString());
}
// Write file (create new file if the file doesnt exist and write the contents)
const write = function (filePath, content) {
    // Check for file existence
    if(fs.existsSync(filePath, content)) {
        fs.appendFileSync(filePath, content);
        console.log("File already exists, new contents appended!");
    } else {
        fs.writeFileSync(filePath, content);
        console.log("New file created and added new notes!");
    }
}

// Delete a file mentioned path
const remove  = function (filePath) {
    if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        console.log("File successfully deleted!")
    } else {
        console.log("File does not exists!");
    }
}

// List all the files in the directory
const list = function (dirPath) {
    fs.readdir(dirPath, (err,files) => {
        if(err) {
            console.log('Unable to read contents in the directory ' + err);
        } else {
            files.forEach((element) => {
                console.log(element);
            })  
        }
    })
}


//exports
module.exports.read = read;
module.exports.write = write;
module.exports.remove = remove;
module.exports.list = list;