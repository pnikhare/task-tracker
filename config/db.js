let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restapi',{ useNewUrlParser: true});
var db = mongoose.connection;
// Added check for DB connection
if(!db)
    console.log("Error connecting db");
else
    console.log("Db connected successfully");