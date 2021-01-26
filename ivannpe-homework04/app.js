// Your webapp code here
const bears = require('./bears.js');
let Bear = bears.Bear;

const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    console.log(`Method: ${req.method}\nPath: ${req.path}\nQuery String: ${JSON.stringify(req.query)}\n`);
    next();
  });
app.use(express.urlencoded({extended: false}));

let allBears = [

]
//reads the json files in labeled bears
bears.readFiles('./labeled_bears/', function(content) {
  //adds new bear object to array
    allBears.push(new Bear(content.imagePath, content.label, content.weight));
    console.log('app started with data', allBears);
  });
//trying to figure out how to do this within recursion but had a lot of errors
app.listen(4000);
//home page
app.get('/', (req, res) => {
    const context = {
      arr: allBears
    };
    res.render('home',context);
});
//search page, could not resolve issue where weight was not filtering
app.get('/search', (req, res) => {
  console.log(req.query);
  let filteredbears = allBears.slice();
  if(req.query.weightQ !== undefined) {
    filteredbears = allBears.filter(bear => bear.weight >= parseInt(req.query.weightQ));
  }

  if (req.query.labelQ != undefined){
    filteredbears = allBears.filter(bear => bear.label == req.query.labelQ);
  }

  res.render('search',{allBears : filteredbears});
});
//adds a bear, redirects to same page to continue adding, bear shows up in homepage
app.post('/add', (req, res) => {
  allBears.push(new Bear(req.body.imagePath, req.body.label, req.body.weight));
  res.redirect('/add');
});

app.get('/add', (req, res) => {
  res.render('add');
});