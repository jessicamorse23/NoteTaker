const htmlRoute = require("express").Router();
const path = require("path");

//route to notes.html
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//route to read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

module.exports = htmlRoutes