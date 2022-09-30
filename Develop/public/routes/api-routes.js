const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
    console.log("notes saved");
  });

  app.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { username, note } = req.body;

    if (req.body) {
      const newNote = {
        username,
        note,
        note_id: uuid(),
      };

      readAndAppend(newNote, "./db/db.json");
      res.json(`Note added successfully 🚀`);
    } else {
      res.error("Error in adding note");
    }
  });

  app.get("/api/feedback", (req, res) => {
    console.info(`${req.method} request received for feedback`);

    readFromFile("./db/feedback.json").then((data) => res.json(JSON.parse(data)));
  });
};
