var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/mongo-ynab';
var port = process.env.PORT || 3000;
var db;

app.use(bodyParser.json());

app.get('/', function (req, res) {

  db.collection('mondo-transaction').find().toArray((err, docs)=> {
    res.send(docs);
  });
});

app.post('/mondo-webhook', (req, res) => {
  console.log('Mondo webhook with', req.body)
  db.collection('mondo-transaction').insert(req.body, (err, docs) => {
    if(err){
      res.send(500);
    } else {
      res.send(docs.ops);
    }
  });
});


MongoClient.connect(mongoUrl, function(err, database) {
  if (err) {
    throw err;
  }
  db = database;
  app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
  });

});
