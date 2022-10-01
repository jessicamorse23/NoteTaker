const api = require("express").Router();
let { notes } = require("..db/db.json");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// GET notes
api.get("/notes", (req, res) => {
  res.json(notes);
});

// new note with UUID
api.post("/notes", (req, res) => {

  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  }

  if(!validateNoteType(newNote)) {
    return res.status(400).send("Give your note a title and some details.");
  } else { 
    addNewNote(newNote, notes);
    res.json(notes);
  }
});
api.delete("/notes/:id", (req, res) => {
  const exists = notes.some(notes => notes.id === req.params.id);
  if(exists) {
    notes = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify({
      notes
    }, null, 2));
    res.json(notes);
  } else { 
    res.status(400).send("Note not found.")
  }
});
module.exports = apiRoutes;
