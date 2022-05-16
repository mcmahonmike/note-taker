const fs = require('fs');
const path = require('path')
const notes  = require('../../db/db.json')
const router = require('express').Router();
//npm package for adding a unique ID for delete option
const { v4: uuidv4 } = require('uuid');


//gets user input
router.get('/notes', (req, res) => {

    res.json(notes)
})
//posts user notes to page
router.post('/notes', (req, res) => {
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    }
    //pushes notes to the new array
     notes.push(newNote)
     
     //writes file to the empty data base
        fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'), JSON.stringify(notes), (err) => {
            if (err)
            console.log(err);
        }
    );
    
    res.json(newNote);
})

//delete function currently in production (unfinished)
router.delete('/notes/:id', (req, res) => {
    const filterNotes = notes.filter(note => note.id != req.params.id )
    console.log(filterNotes)
    
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'), JSON.stringify(filterNotes), (err) => {
            if (err)
            console.log(err);
        }
    );
        res.json(filterNotes)
})


  
  
  module.exports  = router;