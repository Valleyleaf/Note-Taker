const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
// Used this video for reference: https://www.youtube.com/watch?v=ENrzD9HAZK4&t=653s

app.use(express.static(path.join(__dirname, '/Develop/public')));

app.use(express.json());
//Above parses JSON request. Dig into how this works more.

app.get('/notes', (req, res) =>{
        res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./Develop/db/db.json', (err, data) => {
        err ? console.log('error on 23'):res.json(JSON.parse(data));
    })
})

// Learning note: You need to handle both front-end and back-end when dealing with back-end that has visuals outside the console. First get displays html.
// second get sets up the back-end. //New note. Is the above true? potentially but not an absolute.
// Post is create
app.post('/api/notes', (req, res) => {
    fs.readFile('./Develop/db/db.json', (err, data) => {
        if (err){
            res.status(500).json('Error occurred while saving.');
        }else{
            let allNotes = JSON.parse(data)
            let newNote = {
                title:req.body.title,
                text:req.body.text
            }
            allNotes.push(newNote)
            fs.writeFile('./Develop/db/db.json', JSON.stringify(allNotes, null, 4), (err) => {
                if (err) {
                    res.status(500).json('Error occurred while saving.');
                } else {
                  res.json('Its been saved');
                }
              });
        }
    })
})


// Using post to express to api/notes. Need to figure out what api/notes refers to. Probably in index.js
// Can't get this to work for some reason. I need help with fileSystem. Ask Kevin/Toua.

app.delete('/', (req, res) =>{
    // Do this if I have extra time.
    // We want to read from db. Using fs.readFile(Path to db).
    // if/else if we get data or if we get nothing.
    // if no error, parse and return data using JSON.
    // write logic to delete returned data.
    // writeFile update to db removing the deleted data.
});

// Use listen at the bottom. It is simular to a return in that sense.
app.listen(PORT, () => console.log('Available on PORT 3001'));