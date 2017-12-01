var mongoose = require('mongoose');
var {mongodb} = require('../config/setting');
var DB_URL = `mongodb:\/\/${mongodb.host}:${mongodb.port}/${mongodb.database}`;
mongoose.connect(DB_URL,{useMongoClient: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
/**
  * 连接成功
  */
db.once('open', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    

/**
 * 连接异常
 */
db.on('error',console.error.bind(console, 'connection error:'));    
 
/**
 * 
 */
db.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});  

module.exports = mongoose;