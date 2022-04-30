'use strict';

const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();
const appRoute = require('./src/routes/appointmentRoute');
const historyRoute = require('./src/routes/historyRoute');

const app = express();

// use cors to avoid CORS problems
app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


app.use('/api/appointment', appRoute);
app.use('/api/history', historyRoute);


const uri = process.env.DB_URL;
mongoose.connect(uri,
    err => {
        if (err) throw err;
        console.log('connected to MongoDB')
    });

// start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`server running on: ${PORT}`)
})