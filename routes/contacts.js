var express = require('express');
var router = express.Router();

const { check, validationResult } = require('express-validator');

//----------------------------------------> begin Connect to MongoDB <-----------------------------------//
const monk = require('monk');
const url = 'localhost:27017/MongoDB';
const db = monk(url);
db.then(() => {
  //console.log('Connected correctly to MongoDB')
})
//----------------------------------------> end Connect to MongoDB <-----------------------------------//

/* GET contact listing. */
router.get('/', function(req, res, next) {
  res.render('contacts');
});

router.post('/',[
  check("ipFullname", "Please input Name").not().isEmpty(),
  check("ipMobile", "Please input Mobile").not().isEmpty(),
  check("ipLine", "Please input Line id").not().isEmpty(),
  check("ipEmail", "Please input Email").not().isEmpty(),
  check("ipMassage", "Please input Massage").not().isEmpty()
], function(req, res, next) {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()) {
    res.render('contacts',{errors:errors});
  }else{
    //----------------------------------------> begin insert to database <-----------------------------------//
    var tb_contacts = db.get('tb_contacts');
    tb_contacts.insert({
      //-------> field : input form <-------
      fullname:req.body.ipFullname,
      mobile:req.body.ipMobile,
      lineid:req.body.ipLine,
      email:req.body.ipEmail,
      massage:req.body.ipMassage
    },function(err,tb_contacts){
      if(err){
        res.send(err);
      }else{
        req.flash("success", "Insert to database successfully");
        res.location('/contacts');
        res.redirect('/contacts');
      }
    });
    //----------------------------------------> end insert to database <-----------------------------------//
  }
});
module.exports = router;
