// declare dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
// Assing port for router
const PORT = 8001;
// Initialize the express app
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


// GET Route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});
// GET Route for notes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});

// Get Route to read data in db.json file 
app.get("/api/notes", (req, res) => {
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, notes) => {
    if (error) {
      return console.log(error)
    }
    res.json(JSON.parse(notes))
  })
});

// POST Route for a new note
app.post("/api/notes", (req, res) => {
  const currentNote = req.body;
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, notes) => {
    if (error) {
      return console.log(error)
    }
    notes = JSON.parse(notes)
    if (notes.length > 0) {
      let lastId = notes[notes.length - 1].id
      const id = parseInt(lastId) + 1
    } else {
      var id = 10;
    }

    const newNote = {
      title: currentNote.title,
      text: currentNote.text,
      id: id
    }

    var newNotesArr = notes.concat(newNote)
    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(newNotesArr), (error, data) => {
      if (error) {
        return error
      }
      console.log(newNotesArr)
      res.json(newNotesArr);
    })
  });

});

// Delete Route for a note using id
app.delete("/api/notes/:id", (req, res) => {
  let deleteId = JSON.parse(req.params.id);
  console.log("ID to be deleted: ", deleteId);
  fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, notes) => {
    if (error) {
      return console.log(error)
    }
    let notesArray = JSON.parse(notes);

    for (var i = 0; i < notesArray.length; i++) {
      if (deleteId == notesArray[i].id) {
        notesArray.splice(i, 1);

        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(notesArray), (error, data) => {
          if (error) {
            return error
          }
          console.log(notesArray)
          res.json(notesArray);
        })
      }
    }

  });
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
