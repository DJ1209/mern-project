var express = require('express');
var router = express.Router();


var LocationModel = require('../../model/location_table');
var UserModel = require('../../model/user_table');


router.get('/', function(req, res, next) {
  UserModel.find(function(err, db_users_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {

        res.render('admin/user/display', { user_array : db_users_array});
      
      }
  });
 
  
});



router.get('/add', function(req, res, next) {
    LocationModel.find(function(err, db_sub_category_array) {
      if (err) {
          console.log("Error in Fetch Data " + err);
          res.send("Error in Fetch Data " + err);
        } else {
          //Print Data in Console
          console.log(db_sub_category_array);
          //Render User Array in HTML Table
          res.render('admin/user/add', { location_array : db_sub_category_array });
          
        }
    });
});

//Add Form Processing using Post Method 
router.post('/add', function(req, res, next) {
  console.log(req.body);
  //Create an Array 
  const mybodydata = {
    user_name: req.body.txt1,
    user_gender: req.body.txt2,
    user_mobile: req.body.txt3,
    user_email: req.body.txt4,
    user_password: req.body.txt5,
    user_address: req.body.txt6,
    _location:req.body.txt7
}
var data = UserModel(mybodydata);
data.save(function(err) {
    if (err) {
      res.send("<h1> Error "+ err +"</h1>");
      console.log("Error in Insert Record");
    } else {
       console.log("Record Added");
        res.redirect('/admin/users/add')
    }
})

});


//Delete User By ID
router.get('/delete/:id', function(req, res) {
  UserModel.findByIdAndRemove(req.params.id, function(err, project) {
    if (err) {
      console.log("Error in Record Delete " + err);
      res.send("<h1> Error "+ err +"</h1>");
    } else {

      console.log(" Record Deleted ");
        res.redirect('/admin/users/');
    }
});
});



//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {
  console.log(req.params.id);
  UserModel.findById(req.params.id, function(err, db_user_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
        LocationModel.find(function(err, db_location_array) {
          if (err) {
              console.log("Error in Fetch Data " + err);
              res.send("Error in Fetch Data " + err);
            } else {
              //Print Data in Console
              console.log(db_user_array);
              //Render User Array in HTML Table
              console.log(db_location_array);
              res.render('admin/user/edit', { user_array: db_user_array,location_array:db_location_array });
              
            }
        });
          
      }
  });
});


//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {
  console.log("Edit ID is"+ req.params.id);
  const mybodydata = {
    user_name: req.body.txt1,
    user_gender: req.body.txt2,
    user_mobile: req.body.txt3,
    user_email: req.body.txt4,
    user_password: req.body.txt5,
    user_address: req.body.txt6,
    _location:req.body.txt7
}
  UserModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          console.log("Error in Record Update");
          res.redirect('/category/display-category');
      } else {
          res.redirect('/admin/users');
      }
  });
});



module.exports = router;