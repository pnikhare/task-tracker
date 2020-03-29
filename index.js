const express = require('express');
const app = express();
const path = require('path');
const port = 8040;
const ejs = require('ejs');
const db = require('./config/db');
var bodyparser = require("body-parser");
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use('/api/v1',require('./routes/task'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/views', express.static(__dirname + '/views'));

 var swaggerUi = require('swagger-ui-express'),
 swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.listen(port, () => console.log(`Task Tracker app listening on port ${port}!`));
