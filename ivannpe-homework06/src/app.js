// app.js
const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//     console.log(`Method: ${req.method}\nPath: ${req.path}\nQuery String: ${JSON.stringify(req.query)}\n`);
//     next();
//   });
app.use(express.urlencoded({extended: false}));

// app.get('/', (req, res) => {
//     res.send('HELPs');	    
// });

app.listen(3000);