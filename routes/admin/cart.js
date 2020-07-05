var express = require('express');
var router = express.Router();

//Call User Database Model
var CartModel = require('../../model/cart_table');

/*Listing. */
router.get('/', function(req, res, next) {
    CartModel.find(function(err, db_users_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_users_array);
        //Render User Array in HTML Table
        res.render('admin/cart/display', { user_array : db_users_array });
      }
  });
});

//Delete User By ID
router.get('/delete/:id', function(req, res) {
  CartModel.findOneAndDelete(req.params.id, function(err, project) {
    if (err) {
      console.log("Error in Record Delete " + err);
      res.send("<h1> Error "+ err +"</h1>");
    } else {

      console.log(" Record Deleted ");
        res.redirect('/admin/cart/');
    }
});
});



module.exports = router;