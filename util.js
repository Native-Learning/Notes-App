const fs = require('fs');

// Read file
const read = (filePath) => {
    console.log(fs.readFileSync(filePath).toString());
}
// Write file (create new file if the file doesnt exist and write the contents)
const write = (filePath, content) => {
    // Check for file existence
    if(fs.existsSync(filePath, content)) {
        fs.appendFileSync(filePath, content);
        console.log("File already exists, new contents being appended!");
    } else {
        fs.writeFileSync(filePath, content);
        console.log("New file created and added new notes!");
    }
}

// Delete a file mentioned path
const remove  = (filePath) => {
    if(fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        console.log("File successfully deleted!")
    } else {
        console.log("File does not exists!");
    }
}

// List all the files in the directory
const list = (dirPath) => {
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

//working with json for notes

// loading the file from json - helper funtion
const loadJSON = (filePath) => {
    try {
        const fileBuffer = fs.readFileSync(filePath).toString();
        return JSON.parse(fileBuffer);
    } catch (err) {
        console.error('No such file in the directory.');
        return [];
    }
}

// saving the file as JSON - helper function
const saveJSON = (filePath, note) => {
    // stringify the json object and write to file.
    if(fs.existsSync(filePath)) {
        fs.appendFileSync(filePath,JSON.stringify(note))
    }
    fs.writeFileSync(filePath, JSON.stringify(note));
}

// adding note as form of json
const addJsonNote = (title, body, filePath) => {
    const notes = loadJSON(filePath);
    const duplicateNote = notes.filter( (note) => note.title===title );
    if(duplicateNote.length > 0) {
        console.log('Title already exists')
    } else {
        notes.push({
            title: title,
            body: body
        });
        saveJSON(filePath, notes);
    }
}

// removing the json note mentioned title
const deleteJsonNote = (title, filePath) => {
    const notes = loadJSON(filePath);
    if(notes.length > 0) {
        try {
            const keepNotes = notes.filter( (note) => note.title !== title );
            if(keepNotes.length < notes.length) {
                saveJSON(filePath, keepNotes);
                console.log('Notes removed')
            }
        }
        catch (err) {
            console.log(err);
            console.log('no such title exists');
        }
    }
}


// basic way of exporting the functions
// module.exports.read = read;
// module.exports.write = write;
// module.exports.remove = remove;
// module.exports.list = list;

// Clean way to export the functions
module.exports = {
    read: read,
    write: write,
    remove: remove,
    list: list,
    addJsonNote: addJsonNote,
    deleteJsonNote: deleteJsonNote,
}

// inroder to handle the error in app js file
// throw the error in here in catch statement. - Error Bubbling
