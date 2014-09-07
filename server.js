var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
var port = 3030;
var env = process.env.NODE_ENV || 'development';

var app = express();

app.set('view engine', 'jade'); // set view engine to express
app.set('views', __dirname + '/server/views'); // set folder where are views
app.use(express.static(__dirname + '/public')); // set path to static files
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/partials/:partialArea/:partialName', function(req, res) {
    console.log('area: ' + req.params.partialArea);
    console.log('name: ' + req.params.partialName);
     res.render('/public/app/' + req.params.partialArea + '/' + req.params.partialName);
});
app.get('*', function (req, res){
    res.render('index');
});

mongoose.connect('mongodb://localhost/forumsystemdb');
var db = mongoose.connection;
db.once('open', function (err) {
     if(err) {
         console.log('Database could not be opened: ' + err);
         return;
     }

    console.log('Database up and running...');
});

db.on('error', function (err) {
    console.log(err);
});

app.listen(port);
console.log('Server is listening on port: ' + port);
