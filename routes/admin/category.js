var express = require('express');
var router = express.Router();

//Call User Database Model
var CategoryModel = require('../../model/category_table');

/*Listing. */
router.get('/', function(req, res, next) {
  CategoryModel.find(function(err, db_users_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_users_array);
        //Render User Array in HTML Table
        res.render('admin/category/display', { user_array : db_users_array });
      }
  });
});


router.get('/add', function(req, res, next) {
    res.render('admin/category/add', { title: 'Express' });
});

//Add Form Processing using Post Method 
router.post('/add', function(req, res, next) {
  console.log(req.body);
  //Create an Array 
  const mybodydata = {
    category_name: req.body.txt1
}
var data = CategoryModel(mybodydata);
data.save(function(err) {
    if (err) {
      res.send("<h1> Error "+ err +"</h1>");
      console.log("Error in Insert Record");
    } else {
       console.log("Record Added");
        res.render('admin/category/add');
    }
})

});

//Delete User By ID
router.get('/delete/:id', function(req, res) {
  CategoryModel.findByIdAndDelete(req.params.id, function(err, project) {
    if (err) {
      console.log("Error in Record Delete " + err);
      res.send("<h1> Error "+ err +"</h1>");
    } else {

      console.log(" Record Deleted ");
        res.redirect('/admin/category/');
    }
});
});



//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {
  console.log(req.params.id);
  CategoryModel.findById(req.params.id, function(err, db_category_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          console.log(db_category_array);
          res.render('admin/category/edit', { category_array: db_category_array });
      }
  });
});


//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {
  console.log("Edit ID is"+ req.params.id);
  const mybodydata = {
    category_name: req.body.txt1 
  }
  CategoryModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          console.log("Error in Record Update");
          res.redirect('/category/display-category');
      } else {
          res.redirect('/admin/category');
      }
  });
});

module.exports = router;