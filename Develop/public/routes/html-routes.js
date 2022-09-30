const htmlRoute = require("express").Router();
const path = require("path");

// GET Route for homepage
htmlRoute.get("/", (req, res) =>
res.sendFile(path.join(__dirname, "../public/index.html"))
);

// route to notes.html
htmlRoute.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public.notes.html"));
});

// GET route for *
htmlRoute.get("*", (req, res) => 
res.sendFile(path.join(__dirname), "../public/index.html"));

module.exports = htmlRoute