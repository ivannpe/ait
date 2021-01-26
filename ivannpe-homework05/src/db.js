// db.js
const mongoose = require('mongoose') 
// my schema goes here!

// a course number (a String)
// a course name (a String)
// the semester for the course (a String)
// a year (a Number)
// the professor's name (a String)
// the review to be posted (a String)

const Review = new mongoose.Schema ({
    courseNumber: String,
    courseName: String,
	semester: String,
	year: Number,
	professor: String,
	review: String
});


mongoose.model('Review', Review);

mongoose.connect('mongodb://localhost/hw05');