const express = require("express");
const path =require("path");

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require("./public/routes/api-routes");
const htmlRoutes = require("./public/routes/html-routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join (__dirname, "public")));

app.listen(PORT, () => { 
  console.log(`App listening on: ${PORT}`);
});