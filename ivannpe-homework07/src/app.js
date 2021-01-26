const DEFAULT_AIT_PORT = 3000;

// database setup
require('./db');
const mongoose = require('mongoose');

// express
const express = require('express');
const app = express();

// static files
const path = require("path");
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use((req, res, next) => {
  console.log(`Method: ${req.method}\nPath: ${req.path}\nQuery String: ${JSON.stringify(req.query)}\n`);
  next();
});

// body parser
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');

const Review = mongoose.model('Review');

app.get('/api/reviews', function(req, res) {
  // TODO: retrieve all reviews or use filters coming in from req.query
  // send back as JSON list
  const query = {};
  //support query string parameters: year and semester
  if(req.query.semester !== ""){
    query.semester = req.query.semester;
  }
  if(req.query.year !== ""){
    query.year = req.query.year;
  }

  Review.find(query, function (err, result, count) {
      if(err){
        console.log(err);
        res.send(err);
      }
      res.json(result);
      
  });
});

app.post('/api/review/create', (req, res) => {
  // TODO: create new review... if save succeeds, send back JSON
  // representation of saved object
  new Review({
    name: req.body.name,
    semester: req.body.semester,
    year: req.body.year,
    review: req.body.review
  }).save(function(err, result, count){
      if(err){
        console.log(err);
        res.send(err);
      }
      res.json(result);
  });
});

app.listen(process.env.PORT || DEFAULT_AIT_PORT, (err) => {
  console.log('Server started (ctrl + c to shut down)');
});
