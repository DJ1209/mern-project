var express = require('express');
var router = express.Router();

//Call User Database Model
var LocationModel = require('../../model/location_table');

/*Listing. */
router.get('/', function(req, res, next) {
  LocationModel.find(function(err, db_users_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_users_array);
        //Render User Array in HTML Table
        res.render('admin/location/display', { my_array : db_users_array });
      }
  });
});


router.get('/add', function(req, res, next) {
    res.render('admin/location/add', { title: 'Express' });
});

//Add Form Processing using Post Method 
router.post('/add', function(req, res, next) {
  console.log(req.body);
  //Create an Array 
  const mybodydata = {
    location_name: req.body.txt1,
}
var data = LocationModel(mybodydata);
data.save(function(err) {
    if (err) {
      res.send("<h1> Error "+ err +"</h1>");
      console.log("Error in Insert Record");
    } else {
       console.log("Record Added");
        res.render('admin/location/add');
    }
})

});

//Delete User By ID
router.get('/delete/:id', function(req, res) {
  console.log(req.params.id);
  LocationModel.findByIdAndDelete(req.params.id, function(err, project) {
    if (err) {
      console.log("Error in Record Delete " + err);
      res.send("<h1> Error "+ err +"</h1>");
    } else {

      console.log(" Record Deleted ");
        res.redirect('/admin/location/');
    }
});
});



//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {

  console.log(req.params.id);
  
  LocationModel.findById(req.params.id, function(err, db_category_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_category_array);

          res.render('admin/location/edit', { category_array: db_category_array });
      }
  });
});








//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {

  console.log("Edit ID is"+ req.params.id);

  const mybodydata = {
    location_name: req.body.txt1
  }

  LocationModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          console.log("Error in Record Update");
          res.redirect('/admin/location');
      } else {
        
          res.redirect('/admin/location');
      }
  });
});


module.exports = router;