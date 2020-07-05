var express = require('express');
var router = express.Router();
 

var SubCategoryModel = require('../../model/sub_category_table');
var ProductModel = require('../../model/product_table');
/*Listing. */
router.get('/', function(req, res, next) {
  ProductModel.find(function(err, db_product_array){
    console.log(db_product_array);
    if (err) res.json({message: 'There are db_product_array.'});
    ProductModel.find({})
    .populate('_subcategory')
      .exec(function(err, db_product_array) {
        console.log("Final" + db_product_array);
        res.render("admin/product/display", {my_array : db_product_array});
      })
  });
  
});

router.get('/add', function(req, res, next) {
  SubCategoryModel.find(function(err, db_sub_category_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
        res.send("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_sub_category_array);
        //Render User Array in HTML Table
        res.render('admin/product/add', { category_array : db_sub_category_array });
        
      }
  });
  
});

router.post('/add', function(req, res, next) {

  var myfile = req.files.txt4;
  var myfilename = myfile.name;
  console.log(req.body);
  //Create an Array 
  const mybodydata = {
    p_name: req.body.txt1,
    p_price: req.body.txt2,
    p_details: req.body.txt3,
    p_image : myfilename,
    _subcategory: req.body._subcategory
    }
  var data = ProductModel(mybodydata);
  data.save(function(err) {
      if (err) {
        res.send("Error in Insert Record"+ err);
        console.log("Error in Insert Record"+ err);
      } else {
        myfile.mv('public/upload/'+myfilename, function(err) {
          if (err)
            return res.status(500).send(err);
            res.redirect('/admin/product/add');
          });
          
      }
  })
  
});


//Delete User By ID
router.get('/delete/:id', function(req, res) {
  ProductModel.findOneAndDelete(req.params.id, function(err, project) {
    if (err) {
      console.log("Error in Record Delete " + err);
      res.send("<h1> Error "+ err +"</h1>");
    } else {

      console.log(" Record Deleted ");
        res.redirect('/admin/product/');
    }
});
});



//Get Single User for Edit Record
router.get('/edit/:id', function(req, res) {
  console.log(req.params.id);
  ProductModel.findById(req.params.id, function(err, db_product_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
        SubCategoryModel.find(function(err, db_subcat_array) {
          if (err) {
              console.log("Error in Fetch Data " + err);
              res.send("Error in Fetch Data " + err);
            } else {
              //Print Data in Console
              console.log(db_product_array);
              //Render User Array in HTML Table
              console.log(db_subcat_array);
              res.render('admin/product/edit', { product_array: db_product_array,subcat_array:db_subcat_array });
              
            }
        });
          
      }
  });
});


//Update Record Using Post Method
router.post('/edit/:id', function(req, res) {
  console.log("Edit ID is"+ req.params.id);
  const mybodydata = {
    p_name: req.body.txt1,
    p_price: req.body.txt2,
    p_details: req.body.txt3,
   
    _subcategory: req.body._subcategory
    }
  ProductModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          console.log("Error in Record Update");
          res.redirect('/category/display-category');
      } else {
          res.redirect('/admin/product');
      }
  });
});

//Get Single User for Edit Record
router.get('/changephoto/:id', function(req, res) {
  console.log(req.params.id);
  ProductModel.findById(req.params.id, function(err, db_product_array) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
          //Print Data in Console
          console.log(db_product_array);
         
          res.render('admin/product/changephoto', { product_array: db_product_array });
      }
  });
});

//Get Single User for Edit Record
router.post('/changephoto/:id', function(req, res) {
  console.log(req.params.id);
  
  var myfile = req.files.txt4;
  var myfilename = myfile.name;
  const mybodydata = {
    p_image : myfilename,
    }
    ProductModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          console.log("Edit Fetch Error " + err);
      } else {
    
        myfile.mv('public/upload/'+myfilename, function(err) {
          if (err)
            return res.status(500).send(err);
            res.redirect('/admin/product');
          });
    
      }
  });
});
module.exports = router;