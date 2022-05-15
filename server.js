const fs = require('fs');
const path = require('path')
const express = require('express');
const { notes } = require('./db/db.json')

let newNotes = []



const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// app.get('/notes', (req, res) => {
//     res.json(notes)
// })

app.post('/notes', (req, res) => {
    
    let notesObject = {
        title: req.body.title,
        text: req.body.text,
        id: JSON.stringify(newNotes.length)
    };
    newNotes.push(notesObject)

    // fs.writeFileSync(
    //     path.join(__dirname, './db/db.json'),
    //     JSON.stringify({ notes: newNotes })
    // );
    
    res.json(req.body);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
  });


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });