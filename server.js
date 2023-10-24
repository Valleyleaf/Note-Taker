const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
// Used this video for reference: https://www.youtube.com/watch?v=ENrzD9HAZK4&t=653s

app.use(express.static(path.join(__dirname, '/public')));
// The above ensures that all files server to the user on the front-end is from my public directory.

app.use(express.json());
//Above parses JSON request. Dig into how this works more.

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'))    
})


app.get('/notes', (req, res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        err ? console.log('error on 19'):res.json(JSON.parse(data));
    })
})

let generateid = () =>{
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  // Above function works. It generates an ID with 4 letters/numbers.
  // Added note.id to render ActiveNote. Added generateID function to generate id (Taken from previous excersise) 
  // and added id to handleNoteSave. 
//   Learning note: THIS TOOK A LONG TIME TO FIGURE OUT. YOU CAN NOT CALL A FUNCTION WITHIN A OBJECT?
// TRIED TO ORIGINALLY DO LET NEWNOTE ={TITLE:ETC, TEXT:ETC, NEWID:GENERATEID()} BUT THIS DID NOT WORK.
// RETURNED UNDEFINED? WHY.



// Learning note: You need to handle both front-end and back-end when dealing with back-end that has visuals outside the console. First get displays html.
// second get sets up the back-end. //New note. Is the above true? potentially but not an absolute.
// Post is create. This function is responsible for creating the note on the back end. A benefit of this
// is that we can add ID which does not need to be viewed by the user on the front end.
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err){
            res.status(500).json('Error occurred while saving.');
        }else{
            let allNotes = JSON.parse(data)
            let newNoteid = generateid()
            let newNote = {
                title:req.body.title,
                text:req.body.text,
                id:newNoteid
                // Note to self. body referes to body of HTML. title and text is the user input.
            }
            allNotes.push(newNote)
            // Above pushes newNote object into allNotes array which then gets written into db.json.
            fs.writeFile('./db/db.json', JSON.stringify(allNotes, null, 4), (err) => {
                if (err) {
                    res.status(500).json('Error occurred while saving.');
                } else {
                  return;
                }
              });
              res.json('Note db saved');
        }
    })
})
// Above function. readFile
// Using post to express to api/notes. Need to figure out what api/notes refers to. Probably in index.js

app.delete('/api/notes/:id', (req, res) =>{
    // Do this if I have extra time.
    fs.readFile('./db/db.json', (err, data) => {
        if (err){
            res.status(500).json('Error occurred while deleting note.');
        }else{
            let deleteNote = JSON.parse(data);
            deleteNote = deleteNote.filter( note => note.id !== req.params.id)
            fs.writeFile('./db/db.json', JSON.stringify(deleteNote, null, 4), (err) => {
                if (err) {
                    res.status(500).json('Error occurred while deleting.');
                } else {
                  return;
                }
              });
              res.json(deleteNote);
            // write to the db using fa
            // use JSON.stringify
        }
    })
});

// Use listen at the bottom. It is simular to a return in that sense.
app.listen(PORT, () => console.log('Available on PORT 3001'));