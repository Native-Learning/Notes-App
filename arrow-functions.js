// binding this key word - working example

// scope of this will bind the event object.
let event;
event = {
    name: "Birthday party",
    printGuestList: function() {
        console.log('Guest list for ' + this.name)
    }
}

event.printGuestList();
// Guest list for Birthday party

// Same does not work if the arrow function is used.
// scope of this will one level up to arrow function
// arrow functions are not well suited to bind 'this', 
// using arrow functions binding its own property sibling of same level is not possible.

event = {
    name: "Birthday party",
    printGuestList: () => {
        console.log('Guest list for ' + this.name)
    }
}
event.printGuestList();
// Guest list for undefined

// Binding will work if the actual function is used
event = {
    name: "Birthday party",
    printGuestList() {
        console.log('Guest list for ' + this.name)
    }
}
event.printGuestList();
// Guest list for Birthday party

// interesting thing that 
// function () {} might not have access to out level properties (parent)
// () => {} might not have access to sibling property.

event = {
    name: "Birthday party",
    guestList: ['Ravi', 'Sam', 'Tik'],
    printGuestList() { // of function () {} -- works same!
        this.guestList.forEach( function(guest) { // if this is arrow function then everything works fine
            // because arrow function have access to the parent properties.
            console.log( guest + ' attending ' + this.name);
        });
    }
}
event.printGuestList();
// Ravi attending undefined
// Sam attending undefined
// Tik attending undefined

// Solution for the above with out using the arrow function for the above
event = {
    name: "Birthday party",
    guestList: ['Ravi', 'Sam', 'Tik'],
    printGuestList() { // of function () {} -- works same!
        const that = this; // that variable
        this.guestList.forEach( function(guest) { // if this is arrow function then everything works fine
            // because arrow function have access to the parent properties.
            console.log( guest + ' attending ' + that.name);
        });
    }
}
event.printGuestList();
// Ravi attending Birthday party
// Sam attending Birthday party
// Tik attending Birthday party

// Finally here is our handy arrow function which works in wonderful way
event = {
    name: "Birthday party",
    guestList: ['Ravi', 'Sam', 'Tik'],
    printGuestList() { // of function () {} -- works same!
        this.guestList.forEach( (guest) => { 
            console.log( guest + ' attending ' + this.name);
        });
    }
}
event.printGuestList();
// Ravi attending Birthday party
// Sam attending Birthday party
// Tik attending Birthday party

