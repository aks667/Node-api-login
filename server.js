const http = require('http');
const app = require('./app');
const mysql = require('mysql');

//Declaring config file as global variable.
global.config = require('./config/config');


//Mysql connection
global.con = mysql.createConnection(config.dbConnect);


//Create http server
const server = http.createServer(app);



//Start listening
server.listen(config.port, function (){
    console.log("Server running at port : "+config.port);
});