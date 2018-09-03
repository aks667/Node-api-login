const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Initialize express app
const app = express();

//Get Routes
const index = require('./api/routes/index');
const users = require('./api/routes/user');

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nodeApi', {useNewUrlParser:true});
const db = mongoose.connection;
db.on('error', function(){          //To receive any connection error.
    console.error.bind(console, 'connection error:')
});
db.once('open', function() {        //To display message when connected
  // we're connected!
  console.log('MongoDB Connected');
});

//Setup middlewares
app.use(morgan('dev'));                                     //To log URLs in console automatically
app.use(bodyParser.urlencoded({extended: false}));          
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');         //SET THIS TO OUR WEBSITE TO ENHANCE SECURITY
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTION'){
        res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});

//Set routes
app.use('/', index);
app.use('/users', users);


//ERROR HANDLING
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    })
})

module.exports = app;