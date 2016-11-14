/* eslint-disable no-console */

const path = require('path');
const express = require('express');

const api = require('./api');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('dist'))

app.use('/api', api);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, err => {
    if(err) {
        console.log(err);
        return;
    }
    console.log(`Listening at http://localhost:${port}`);
});
