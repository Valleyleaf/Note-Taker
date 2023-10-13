// console.log('hello world')

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = 3001;

app.use(express.static(path.join(__dirname, 'Develop/public')));

app.use(express.json());
//Above parses JSON request. Dig into how this works.

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});
//Above get request calls for 

app.get('/api/notes', (req, res) =>{
    fs.readFile(path.join(__dirname, '/Develop/db/db.json'), (err, data) => {
        if (err) throw error
        return res.json(JSON.parse(data));
})});
// Get is retreving items.

app.post('/', (req, res) =>{
    fs.writeFile(path.join(__dirname, 'index.html'));
});
// post is creating items. Req body is needed.

// :id
app.delete('/', (req, res) =>{
    // We want to read from db. Using fs.readFile(Path to db).
    // if/else if we get data or if we get nothing.
    // if no error, parse and return data using JSON.
    // write logic to delete returned data.
    // writeFile update to db removing the deleted data.
});

//Get Push, Post and Delete are concepts for you to dig into.

// Use listen at the bottom. It is simular to a return in that sense.
app.listen(3001);