var express = require('express');
var router = express.Router();

//Call User Database Model
var ProductModel = require('../../model/product_table');
var ProductSizeModel = require('../../model/product_size_table');
/*Listing. */
router.get('/', function(req, res, next) {
  ProductSizeModel.find(function(err, db_subcategory_array){
    console.log(db_subcategory_array);
    if (err) res.json({message: 'There are Category.'});
    ProductSizeModel.find({})
    .populate('_product')
      .exec(function(err, db_subcategory_array) {
        console.log(db_subcategory_array);
        res.render("admin/productsize/display", { product_array: db_subcategory_array });
      })
  });
 
});

router.get('/add', function(req, res, next) {
  ProductModel.find(function(err, db_category_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
        res.send("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_category_array);
        //Render User Array in HTML Table
        res.render('admin/productsize/add', { product_array : db_category_array });
        
      }
  });
     
});

router.post('/add', function(req, res, next) {
  console.log(req.body);
  //Create an Array 
  const mybodydata = {
    p_size: req.body.txt1,
    _product: req.body._product
    }
  var data = ProductSizeModel(mybodydata);
  data.save(function(err) {
      if (err) {
        res.send("Error in Insert Record"+ err);
        console.log("Error in Insert Record"+ err);
      } else {
          res.redirect('/admin/productsize/add');
      }
  })
});



//Delete User By ID
router.get('/delete/:id', function(req, res) {
    ProductSizeModel.findByIdAndRemove(req.params.id, function(err, project) {
      if (err) {
        console.log("Error in Record Delete " + err);
        res.send("<h1> Error "+ err +"</h1>");
      } else {
  
        console.log(" Record Deleted ");
          res.redirect('/admin/productsize/');
      }
  });
  });
module.exports = router;