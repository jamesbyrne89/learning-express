const express = require('express');
const cities = require('./cities')

const app = express();

app.get('/data', (req, resp) => {
    resp.send(cities)
})

app.listen(3000)