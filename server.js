const express = require('express');
const app = express();
let pack = require("./package")

app.get(`/`, (req, res) => {
  res.sendStatus(200)
});

app.listen(3000, () => {
  console.log('Servidor express: ok');
});