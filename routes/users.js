var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator');

//----------------------------------------> begin Connect to MongoDB <-----------------------------------//
const monk = require('monk');
const url = 'localhost:27017/MongoDB';
const db = monk(url);
db.then(() => {
  //console.log('Connected correctly to MongoDB')
});
//----------------------------------------> end Connect to MongoDB <-----------------------------------//

/******************************** GET users listing. ********************************/
router.get('/', function(req, res, next) {
  res.render('users');
});

router.get('/add', function(req, res, next) {
  res.render('usersAdd');
});

router.post('/add', [
  check("InputUsername", "Please input Username").not().isEmpty(),
  check("InputPassword", "Please input Password").not().isEmpty(),
  check("InputFullname", "Please input Name - Surname").not().isEmpty(),
  check("InputCompany", "Please select Company").not().isEmpty(),
  check("InputDepartment", "Please select Department").not().isEmpty()
], function(req, res, next) {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()) {
    res.render('usersAdd',{errors:errors});
  }else{
    //----------------------------------------> begin insert to database <-----------------------------------//
    var tb_users = db.get('tb_users');
    tb_users.insert({
      //-------> field : input form <-------
      userlogin:req.body.InputUsername,
      userpass:req.body.InputPassword,
      fullname:req.body.InputFullname,
      usercomp:req.body.InputCompany,
      userdep:req.body.InputDepartment
    },function(err,tb_users){
      if(err){
        res.send(err);
      }else{
        req.flash("success", "Insert to database successfully");
        res.location('/users');
        res.redirect('/users');
      }
    });
    //----------------------------------------> end insert to database <-----------------------------------//
  }
});

module.exports = router;
