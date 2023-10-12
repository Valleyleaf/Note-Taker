// console.log('hello world')

const express = require('express')
const app = express()

app.listen(3000)

app.get('./', (req, res) =>{
    console.log('Confirmed line 9')
    res.sendfILE(path.join(__dirname, 'index.html'))
});
