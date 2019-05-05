const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const crawlerRotas = require('./src/crawler');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.use(cors())


app.use('/', crawlerRotas)

app.listen(3001, () => {console.log('running')})