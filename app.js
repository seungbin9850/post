const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const config = require('./config');
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.set('jwt-secret', config.secret);

app.get('/', (req, res) => {
    res.send('Hello');
});

app.use('/api', require('./routes/api'));
app.listen(port, () => {
    console.log('server is running');
});

mongoose.connect(config.mongodbUri, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('DB connected');
});