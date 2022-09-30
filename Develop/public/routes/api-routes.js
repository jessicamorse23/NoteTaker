const api = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, ".db/db.json");

api.get("/notes", (req, res) => {
  res.sendFile(filePath);
});

api.post("/notes", (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);

      parsedData.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(parsedNotes, null, 4), (err) => {
        err ? console.log(err) : console.log("successfully added note");
      });
    }
  });
});
