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

app.get('/', (req, res) =>{
    console.log('hit index.html')
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

app.get('/notes', (req, res) =>{
    console.log('hit notes.html')
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'));
});

// Why did we name this api. Button does not bring us here. Modify html asset?
// app.get('/notes', (req, res) => res.json(noteData));

// Learning note: You need to handle both front-end and back-end when dealing with back-end that has visuals outside the console. First get displays html.
// second get sets up the back-end.


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