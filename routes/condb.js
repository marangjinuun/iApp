const { check, validationResult } = require('express-validator');
const monk = require('monk');

//----------------------------------------> begin Connect to MongoDB <-----------------------------------//
const url = 'localhost:27017/MongoDB';
const db = monk(url);
db.then(() => {
  console.log('Connected correctly to MongoDB')
})
//----------------------------------------> end Connect to MongoDB <-----------------------------------//
