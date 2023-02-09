const express = require('express');
const path = require('path');
const fs = require('fs');
// const routes = require('./public/routes/index');
const db = require('./db/db.json')
const app = express();

// Server setup
const PORT = process.env.PORT || 5001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Middleware
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});

// Get request
app.get('/api/notes', (req, res) => {
  var data = fs.readFileSync(path.join(__dirname, 'db', 'db.json'))
  notes = [].concat(JSON.parse(data))
  res.json(notes);
});

// Post request
app.post('/api/notes', (req, res) => {
  ;
});

// Delete request
app.delete('/api/notes', (req, res) =>
  fs.readFile(path.join('.Develop/db/db.json').then(function (data) {
    notes = [].concat.apply(JSON.parse(data))
  }))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} `)
);
