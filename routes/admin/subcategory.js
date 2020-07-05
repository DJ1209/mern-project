var express = require('express');
var router = express.Router();

//Call User Database Model
var CategoryModel = require('../../model/category_table');
var SubCategoryModel = require('../../model/sub_category_table');
/*Listing. */
router.get('/', function(req, res, next) {
  SubCategoryModel.find(function(err, db_subcategory_array){
    console.log(db_subcategory_array);
    if (err) res.json({message: 'There are Category.'});
    SubCategoryModel.find({})
    .populate('_category')
      .exec(function(err, db_subcategory_array) {
        console.log(db_subcategory_array);
        res.render("admin/subcategory/display", { subcategory_array: db_subcategory_array });
      })
  });
 
});

router.get('/add', function(req, res, next) {
  CategoryModel.find(function(err, db_category_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
        res.send("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_category_array);
        //Render User Array in HTML Table
        res.render('admin/subcategory/add', { category_array : db_category_array });
        
      }
  });
     
});

router.post('/add', function(req, res, next) {
  console.log(req.body);
  //Create an Array 
  const mybodydata = {
    sub_category_name: req.body.txt1,
    _category: req.body._category
    }
  var data = SubCategoryModel(mybodydata);
  data.save(function(err) {
      if (err) {
        res.send("Error in Insert Record"+ err);
        console.log("Error in Insert Record"+ err);
      } else {
          res.redirect('/admin/subcategory/add');
      }
  })
});
 
router.get('/edit/:id', function(req, res) {
  console.log(req.params.id);
  SubCategoryModel.findById(req.params.id, function(err, db_sub_category_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
        
        CategoryModel.find(function(err, db_category_array) {
          if (err) {
              console.log("Error in Fetch Data " + err);
              res.send("Error in Fetch Data " + err);
            } else {
              //Print Data in Console
              console.log(db_category_array);
              //Render User Array in HTML Table
              
              res.render('admin/subcategory/edit', { sab_category_array: db_sub_category_array,category_array : db_category_array  });
            }
        });
          
         
      }
  });
});


router.post('/edit/:id', function(req, res, next) {
  console.log(req.body);
  //Create an Array 
  const mybodydata = {
    sub_category_name: req.body.txt1,
    _category: req.body._category
    }
SubCategoryModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
  
      if (err) {
        res.send("Error in Insert Record"+ err);
        console.log("Error in Insert Record"+ err);
      } else {
          res.redirect('/admin/subcategory/');
      }
  });
});

module.exports = router;