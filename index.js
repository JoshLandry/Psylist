var engines = require('consolidate');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(express.static('views'));

app.get('/', function(request, response) {
  response.render('./Psylist.html')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});