
const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyparser.json());

module.exports = app;
