const utils = require('./util');
const yargs = require('yargs');
const chalk = require('chalk');

// Update the version of node package
// yargs.version('1.1.0');

yargs.command({
    command: 'add',
    description: 'Used to add new file with some contents.',
    builder: {
        filePath: {
            description: 'Path of file to be added or appended.',
            demandOption: true,
            type: 'string'
        },
        content: {
            description: 'Content to be added or appended.',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        utils.write(argv.filePath, argv.content);
    }
});

yargs.command({
    command: 'remove',
    description: 'Used to remove existing file',
    builder: {
        filePath: {
            describe: 'Path of file to be deleted',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        utils.remove(argv.filePath);
    }
});

yargs.command({
    command: 'list',
    describe: 'Used to list all notes',
    builder: {
        dirPath: {
            description: 'path of directory for files to be listed',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        utils.list(argv.dirPath)
    }
});

yargs.command({
    command: 'read',
    describe: 'Used to read file contents in notes',
    builder: {
        filePath: {
            description: 'Path of file to be read',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        utils.read(argv.filePath);
    }
});

// json notes add
yargs.command({
    command: 'addJsonNote',
    describe: 'Appends the notes are json format in .json file',
    builder: {
        title: {
            description: 'Title goes here',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: 'Notes content goes here',
            demandOption: true,
            type: 'string'
        },
        filePath: {
            description: 'Path of json file.',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        utils.addJsonNote(argv.title, argv.body, argv.filePath);
    }
})
// remove
yargs.command({
    command: 'deleteJsonNote',
    describe: 'Deletes the notes are json file given title',
    builder: {
        title: {
            description: 'mention title of note to be deleted',
            demandOption: true,
            type: 'string'
        },
        filePath: {
            description: 'Path of json file.',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        utils.deleteJsonNote(argv.title, argv.filePath);
    }
})

// This line seems to be mandatory for yargs to pick up the commands
// console.log(yargs.argv);
yargs.parse();





