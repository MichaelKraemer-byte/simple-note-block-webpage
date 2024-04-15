let titles = [];
let notes = [];

let binTitles = [];
let binNotes = [];

load();
loadBin();

function render() {
    // Notizblock    
    let noteContainer = document.getElementById('noteContainer');
    noteContainer.innerHTML = ``;

    if(titles.length === 0) {
        document.getElementById('noteContainer').style ='box-shadow: none;';
        document.getElementById('h2').style = 'display: none;';
    } else {
    for ( let i = 0; i < titles.length; i++) {
        noteContainer.innerHTML += `
        <div class="addedNoteContainer">
        <div class="addedTitles">${titles[i]}</div>
        <div class="addedNotes">${notes[i]}</div>
        <button class="addAndDeleteButton" onclick="deleteNote(${i}); renderBin();">Delete</button>
        </div>`;
    }
    }
}


function renderBin() {
    // Muelleimer
    let binContainer = document.getElementById('binContainer');
    binContainer.innerHTML ='';

        if(binTitles === 0) {
        document.getElementById('binContainer').style += 'box-shadow: none;';
    } else {
    for ( let i = 0; i < binTitles.length; i++) {
    binContainer.innerHTML +=`
    <div class="addedNoteContainer">
    <div class="addedTitles">${binTitles[i]}</div>
    <div class="addedNotes">${binNotes[i]}</div>
    <button class="addAndDeleteButton" onclick="deleteNoteOutOfBin(${i})">Delete</button>
    </div>`;
    }
}
}


function openBin() {
    document.getElementById('greyContainer').classList.remove('d-none');
    document.getElementById('binNotesSection').classList.remove('d-none');
    renderBin ();
}

function closeBin() {
    document.getElementById('greyContainer').classList.add('d-none');
    document.getElementById('binNotesSection').classList.add('d-none');
}

function emptyBin() {
    binTitles = [];
    binNotes = [];
    saveBin();
    renderBin();
}


function add() {
    let title = document.getElementById('title');
    let note = document.getElementById('note');

    titles.push(title.value);
    notes.push(note.value);

    render();
    save();

    title.value = '';
    note.value = '';
}

function deleteNote(i) {
    binTitles.push(titles[i]);
    binNotes.push(notes[i]); 

    renderBin();
    saveBin();

    // Notiz loeschen function
    titles.splice(i, 1);
    notes.splice(i, 1);

    save();
    render();
}

function deleteNoteOutOfBin(i) {
    binTitles.splice(i, 1);
    binNotes.splice(i, 1);


    renderBin();    
    saveBin();
}

function save() {
    let titlesAsText = JSON.stringify(titles);
    let notesAsText = JSON.stringify(notes);

    localStorage.setItem('Titles', titlesAsText);
    localStorage.setItem('Notes', notesAsText);
}

function saveBin() {
    let binTitlesAsText = JSON.stringify(binTitles);
    let binNotesAsText = JSON.stringify(binNotes);

    localStorage.setItem('Bin Titles', binTitlesAsText);
    localStorage.setItem('Bin Notes', binNotesAsText);
}

function load() {
    let titlesAsText = localStorage.getItem('Titles');
    let notesAsText = localStorage.getItem('Notes');

    if (titlesAsText && notesAsText) {
    titles = JSON.parse(titlesAsText);
    notes = JSON.parse(notesAsText);
    }
}

function loadBin() {
    let binTitlesAsText = localStorage.getItem('Bin Titles');
    let binNotesAsText = localStorage.getItem('Bin Notes');

    if (binNotesAsText && binTitlesAsText ) {
        binTitles = JSON.parse(binTitlesAsText);
        binNotes = JSON.parse(binNotesAsText);
    }
}