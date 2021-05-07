const express = require('express');
const app = express();

app.get(`/`, (req, res) => {
  res.sendStatus(200)
});

app.get(`/monitor1`, (req, res) => {
  res.sendStatus(200)
})

app.get(`/monitor2`, (req, res) => {
  res.sendStatus(200)
})

app.get(`/monitor3`, (req, res) => {
  res.sendStatus(200)
})

app.get(`/monitor4`, (req, res) => {
  res.sendStatus(200)
})

app.get(`/monitor5`, (req, res) => {
  res.sendStatus(200)
})

app.get(`/monitor6`, (req, res) => {
  res.sendStatus(200)
})

app.listen(3000, () => {
  console.log('Servidor express: ok');
});