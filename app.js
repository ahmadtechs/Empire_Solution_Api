// Libraries install for the api management
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require( __dirname + '/config/keys.js' );

const app = express();

const eventRoutes = require('./api/routes/events');
const users = require('./api/routes/users.js');

mongoose.connect( config.mongoURI, config.mongoCFG)
.catch((error) => {
    console.log(JSON.stringify(error))
})




app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
    if(req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/events', eventRoutes);
app.use('/users', users);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) =>{
    res.status(error.status || 500 );
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;