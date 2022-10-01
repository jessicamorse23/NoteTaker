// const api = require("express").Router();
// const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid')
const db = require("../../db/db.json");


module.exports = (app) => {
  // API GET request
  app.get("/api/notes", function (req, res) {
      res.json(db);
      fs.readFile(__dirname + "../../db/db.json", (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
      });
  });

// API POST request
app.post("/api/notes", (req, res) => {
  let allNotes = [];
  let newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
  }
  fs.readFile(__dirname + "../../db/db.json", (err, data) => {
      if (err) throw err;
      allNotes = JSON.parse(data);
      allNotes.push(newNote);
      fs.writeFile(__dirname + "../../db/db.json", JSON.stringify(allNotes), "utf-8", (err) => {
          if (err) throw err;
          console.log("The note has been saved.")
          res.end();
      })
  })
  console.log(newNote)
});

// API DELETE Request
  app.delete("/api/notes/:id", (req, res) => {
      let noteId = req.params.id;
      fs.readFile(__dirname + "../../db/db.json", (err, data) => {
          if (err) throw err;
          let notesDB = JSON.parse(data);
          const filteredNotes = notesDB.filter(values => values.id != noteId);
          fs.writeFile(__dirname + "../../db/db.json", JSON.stringify(filteredNotes), "utf-8", err => {
              if (err) throw err;
              console.log("The note has been deleted.")
              res.end();
          });
      });
  });
};

