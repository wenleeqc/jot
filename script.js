"use strict";
let myNotes = JSON.parse(localStorage.getItem('myNotes')) ? JSON.parse(localStorage.getItem('myNotes')) : [];
const gradientsArray = ['gradient-blue', 'gradient-purple', 'gradient-turquoise', 'gradient-yellow', 'gradient-green', 'gradient-pink'];
let currentGradientsApplied = [];

// 500 character limit
// on hover expand
// on hover show delete button

const textBox = document.querySelector('#text-box');
const notesContainer = document.querySelector('ul');
const clearBtn = document.querySelector('#clear-btn');
const addNewNoteBtn = document.querySelector('#add-new-note-btn');

renderNotes();

textBox.addEventListener('keyup', (e) => {
    const note = textBox.value;
    if(e.key === "Enter" || e.keyCode === 13) {
        if(note && !!note.replace(/\s/g, '').length) {
            addNote(note);
        } 
        textBox.value = "";
        //textBox.selectionStart = 0;
    } else {
        localStorage.setItem('tempNote', JSON.stringify(note));
        console.log(note);
    }
});

addNewNoteBtn.addEventListener('click', () => {
    const note = textBox.value;
    if(note && !!note.replace(/\s/g, '').length) {
        addNote(note);
    }
});

// clearBtn.addEventListener('click', () => {
//     myNotes = [];
//     console.log(myNotes)
//     localStorage.setItem('myNotes', null);   
//     notesContainer.innerHTML = "";
// });

function addNote(note) {
    myNotes.push(note);
    localStorage.setItem('myNotes', JSON.stringify(myNotes));
    localStorage.setItem('tempNote', null);
    renderNote(note);
    textBox.value = "";
    //textBox.selectionStart = 0;
    console.log(textBox.selectionStart);
}

function renderNote(note) {
    const newNote = document.createElement('li');
    newNote.classList.add(randomGradient());
    newNote.textContent = note;

    // newNote.addEventListener('click', () => {
    //     newNote.classList.toggle('hideOverflow');
    // });

    newNote.addEventListener('dblclick', () => { //click
        newNote.remove();
        myNotes.splice(myNotes.indexOf(newNote), 1);
        localStorage.setItem('myNotes', JSON.stringify(myNotes))
    });

    notesContainer.append(newNote);
}

function renderNotes() {
    for(const note of myNotes) {
        renderNote(note)
    }
}

function randomGradient() {
    // generator random number
    // numbers mapped to gradient classes
    // return gradient class
    if(currentGradientsApplied.length === gradientsArray.length) {
        currentGradientsApplied = [];
    }

    let gradient = gradientsArray[Math.floor(Math.random() * gradientsArray.length)];
    while(currentGradientsApplied.includes(gradient)) {
        gradient = gradientsArray[Math.floor(Math.random() * gradientsArray.length)];
    }
    currentGradientsApplied.push(gradient);

    return gradient;
    // return gradientsArray[Math.floor(Math.random() * gradientsArray.length)];
}

// function clearNotes() {
//     myNotes = [];
//     console.log(myNotes)
//     localStorage.setItem('myNotes', null);   
//     notesContainer.innerHTML = "";
// }