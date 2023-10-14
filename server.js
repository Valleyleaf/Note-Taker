//Const Library goes here
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const noteData = require('./Develop/db/db.json');
const PORT = process.env.PORT || 3001;
// Used this video for reference: https://www.youtube.com/watch?v=ENrzD9HAZK4&t=653s

app.use(express.static(path.join(__dirname, 'Develop/public')));

app.use(express.json());
//Above parses JSON request. Dig into how this works more.


// Below are the two get requests for pulling index and notes .html. I also added error responses to be fancy.
app.get('/', (req, res) =>{
    try {
        res.sendFile(path.join(__dirname, 'Develop/public/index.html'));

    } catch (err) {
        response.status(500).send('No response from server.')
    }
});

app.get('/notes', (req, res) =>{
    try {
        res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));

    } catch (err) {
        response.status(500).send('No response from server.')
    }
});

// Learning note: You need to handle both front-end and back-end when dealing with back-end that has visuals outside the console. First get displays html.
// second get sets up the back-end. //New note. Is the above true? potentially but not an absolute.



app.delete('/', (req, res) =>{
    // We want to read from db. Using fs.readFile(Path to db).
    // if/else if we get data or if we get nothing.
    // if no error, parse and return data using JSON.
    // write logic to delete returned data.
    // writeFile update to db removing the deleted data.
});

//Get Push, Post and Delete are concepts for you to dig into.

// Use listen at the bottom. It is simular to a return in that sense.
app.listen(PORT, () => console.log('Available on PORT 3001'));