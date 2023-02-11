const express = require('express');
const path = require('path');
const fs = require('fs');

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

// POST request to add a review
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { id, title, text } = req.body;

  // If all the required properties are present
  if (id && title && text) {
    // Variable for the object we will save
    const activeNote = {
      id,
      title,
      text,
    };

    // Obtain existing notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const saveNote = JSON.parse(data);

        // Add a new review
        saveNoteBtn.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(saveNote, null, 2),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated note!')
        );
      }
    });

    const response = {
      status: 'success',
      body: saveNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
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
