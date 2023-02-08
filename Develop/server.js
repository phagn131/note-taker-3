const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./js/index.js');

// Server setup
const PORT = process.env.PORT || 5001;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

// Static Middleware
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public','index.html'))
);

// GET Route for feedback page
app.get('/api/notes', (req, res) =>
  fs.readFile(path.join('.Develop/db/db.json').then(function(data) {
    notes = [].concat.apply(JSON.parse(data))
  }))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} `)
);
