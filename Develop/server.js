const express = require("express");
// const path =require("path");

const PORT = process.env.PORT || 3001;
const app = express();
const dbJson = require("./db/db.json")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// require routes files
require("./public/routes/api-routes")(app);
require("./public/routes/html-routes")(app);

app.listen(PORT, () => { 
  console.log(`App listening on: ${PORT}`);
});