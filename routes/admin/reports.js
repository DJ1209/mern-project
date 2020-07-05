var express = require('express');
var router = express.Router();

//Call User Database Model
var OrderMasterModel = require('../../model/order_master_table');
var OrderDetailsModel = require('../../model/order_detail_table');
var SubCategoryModel = require('../../model/sub_category_table');
var ProductModel = require('../../model/product_table');

/*Listing. */
router.get('/product', function(req, res, next) {
    ProductModel.find(function(err, db_product_array){
      console.log(db_product_array);
      if (err) res.json({message: 'There are db_product_array.'});
      ProductModel.find({})
      .populate('_subcategory')
        .exec(function(err, db_product_array) {
          console.log("Final" + db_product_array);
          res.render("admin/reports/products", {my_array : db_product_array});
        })
    });
    
  });
  
router.get('/ordermaster', function(req, res, next) {
    OrderMasterModel.find(function(err, db_sub_category_array) {
        if (err) {
            console.log("Error in Fetch Data " + err);
            res.send("Error in Fetch Data " + err);
          } else {
            //Print Data in Console
            console.log(db_sub_category_array);
            //Render User Array in HTML Table
            res.render('admin/reports/ordermaster', { order_array : db_sub_category_array });
            
          }
      });
});
router.get('/orderdetails/', function(req, res, next) {
    OrderDetailsModel.find({order_id:req.params.id},function(err, db_users_array){
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_users_array);
        //Render User Array in HTML Table
        res.render('admin/reports/ordermaster1', { my_array : db_users_array });
      }
  });
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






module.exports = router;