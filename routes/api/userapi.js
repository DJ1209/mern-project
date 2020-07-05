var express = require('express');
var router = express.Router();

//Call User Database Model


var UserModel = require('../../model/user_table');
var CategoryModel = require('../../model/category_table');
var SubCategoryModel = require('../../model/sub_category_table');
var ProductModel = require('../../model/product_table');
var CartModel = require('../../model/cart_table');
var OrderMasterModel = require('../../model/order_master_table');
var OrderDetailsModel = require('../../model/order_detail_table');

router.get('/', function(req, res, next) {
  res.render('api/home');
});

router.get('/get-category-api', function(req, res, next) {
  CategoryModel.find(function(err, db_users_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_users_array);
        //Render User Array in HTML Table
        res.status(200).send(JSON.stringify({"flag": 1, "message": "Data Fetch", "data": db_users_array}));
      }
  });
});

router.get('/get-sub-category-api', function(req, res, next) {
  SubCategoryModel.find(function(err, db_users_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_users_array);
        //Render User Array in HTML Table
        res.status(200).send(JSON.stringify({"flag": 1, "message": "Data Fetch", "data": db_users_array}));
      }
  });
});
router.get('/get-sub-category-api/:id', function(req, res, next) {
  SubCategoryModel.find({_subcategory:req.params.id},function(err, db_product_array){
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_users_array);
        //Render User Array in HTML Table
        res.status(200).send(JSON.stringify({"flag": 1, "message": "Data Fetch", "data": db_users_array}));
      }
  });
});




router.get('/get-product-api', function(req, res, next) {
  ProductModel.find(function(err, db_product_array){
    console.log(db_product_array);
        res.status(200).send(JSON.stringify({"flag": 1, "message": "Data Fetch", "data": db_product_array}));
  });
});

router.get('/get-product-api/:id', function(req, res, next) {
  ProductModel.find({_subcategory:req.params.id},function(err, db_product_array){
    console.log(db_product_array);
        res.status(200).send(JSON.stringify({"flag": 1, "message": "Data Fetch", "data": db_product_array}));
  });
});





router.get('/get-product-details-api/:id', function(req, res, next) {
  ProductModel.findById(req.params.id,function(err, db_product_array){
    console.log(db_product_array);
        var myarray = [];
        myarray.push(db_product_array);
        res.status(200).send(JSON.stringify({"flag": 1, "message": "Data Fetch", "data": myarray}));
   
  });
});



router.get('/get-users-profile-api/:id', function(req, res, next) {
  UserModel.find({_id:req.params.id},function(err, db_users_array){
      if (err) {
        res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Error", "data": err}));
        } else {
          //Print Data in Console
          console.log(db_users_array);
          //res.send(db_users_array);
          res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Data Fetch", "data": db_users_array}));
        }
    });
  });

  //Add Form Processing using Post Method 
router.post('/signup-api', function(req, res, next) {
    console.log(req.body);
    //Create an Array 
    const mybodydata = {
      user_name: req.body.user_name,
      user_gender: req.body.user_gender,
      user_mobile: req.body.user_mobile,
      user_email: req.body.user_email,
      user_password: req.body.user_password,
      user_address: req.body.user_address,
      
  }
  var data = UserModel(mybodydata);
  data.save(function(err) {
      if (err) {
        res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Data Error" , "data":err}));
        console.log("Error in Insert Record");
      } else {
         console.log("Record Added");
         res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Record Added", "data": ''}));
      }
  })
  });



  router.post('/login-api', function(req, res, next) {
    var email = req.body.user_email;
  var password = req.body.user_password;
  console.log(req.body);
  UserModel.find({ "user_email": email }, function (err, db_users_array) {
    console.log("Find One " + db_users_array);
    if (db_users_array) {
      var db_email = db_users_array.user_email;
      var db_password = db_users_array.user_password;
    }
    console.log("db_users_array.admin_email " + db_email);
    console.log("db_users_array.admin_password " + db_password);
    if (db_email == null) {
      res.json({
        flag: 0,
        message: 'Email not Found',
        data: db_users_array
      })
     
    }
    else if (db_email == email && db_password == password) {
      res.json({
        flag: 1,
        message: 'successfully authenticated',
        data: db_users_array
      })
    }
    else {
      res.json({
        flag: 0,
        message: 'Email and password does not match',
        data: db_users_array
      })
    }
  });
  });


  router.post('/forgot-password-api', function(req, res, next) {
    var myemail = req.body.user_email;
  
  console.log(req.body);
  UserModel.find({ "user_email": myemail }, function (err, db_users_array) {
    console.log("Find One " + db_users_array);
    
    var dbemail =  db_users_array[0].user_email
    var dbpassword = db_users_array[0].user_password
    console.log("user_email " + dbemail);
    console.log("user_password " + dbpassword);

    if (dbemail == myemail) 
    {

      "use strict";
      const nodemailer = require("nodemailer");
      // async..await is not allowed in global scope, must use a wrapper
      async function main(){
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let account = await nodemailer.createTestAccount();
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: "shop61771@gmail.com", // generated ethereal user
            pass: "shophub4242" // generated ethereal password
          }
        });
        // setup email data with unicode symbols
        let mailOptions = {
          from: '"Forgot Password" <foo@example.com>', // sender address
          to: dbemail, // list of receivers
          subject: "Forgot Password", // Subject line
          text: "Hello your password is "  + dbpassword, // plain text body
          html: "Hello your password is "  + dbpassword // html body
        };
        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions)
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        //res.end("Password Sent on your Email");
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }
      
      main().catch(console.error);
      res.json({
        flag: 1,
        message: 'successfully sent',
        data: db_users_array
      })
    }
    else {
      res.json({
        flag: 0,
        message: 'Email and password does not match',
        data: db_users_array
      })
    }
  });
  });


router.delete('/delete/:id', function(req, res) {
    UserModel.findOneAndDelete(req.params.id, function(err, project) {
      if (err) {
        res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Data Error" , "data":err}));
        res.send("<h1> Error "+ err +"</h1>");
      } else {
  
        console.log(" Record Deleted ");
        res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Record Deleted", "data": ''}));
      }
  });
  });



  //Add Form Processing using Post Method 
router.post('/add-cart-api', function(req, res, next) {
  console.log("Cart Data From UserSide"+req.body);
  //Create an Array 
  const mybodydata = {
    user_id: req.body.user_id,
    product_id: req.body.product_id,
    p_name: req.body.product_name,
    p_price: req.body.product_price,
    p_qty: req.body.qty,
    p_image: req.body.product_image
}
var data = CartModel(mybodydata);
data.save(function(err) {
    if (err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Data Error" , "data":err}));
      console.log("Error in Insert Record");
    } else {
       console.log("Record Added");
       res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Record Added", "data": ''}));
    }
})
});

router.get('/remove-cart-api/:id', function(req, res) {
  CartModel.findByIdAndRemove(req.params.id, function(err, project) {
    if (err) {
      res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Data Error" , "data":err}));
      res.send("<h1> Error "+ err +"</h1>");
    } else {

      console.log(" Record Deleted ");
      res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Record Deleted", "data": ''}));
    }
});
});


router.get('/get-cart-api/:id', function(req, res, next) {
  CartModel.find({user_id:req.params.id},function(err, db_product_array){
    console.log(db_product_array);
        res.status(200).send(JSON.stringify({"flag": 1, "message": "Data Fetch", "data": db_product_array}));
  });
});

router.get('/get-order-master-api/:id', function(req, res, next) {
  OrderDetailsModel.find({user_id:req.params.id},function(err, db_product_array){
    console.log(db_product_array);
        res.status(200).send(JSON.stringify({"flag": 1, "message": "Data Fetch", "data": db_product_array}));
  });
});


  //Add Form Processing using Post Method 
router.post('/confirm-order-api', function(req, res, next) {
    console.log("Cart Data From UserSide"+req.body.user_id);
    var datetime = new Date();
    var today = datetime.toISOString().slice(0,10);
    var userid = req.body.user_id;
    const mybodydata = {
      order_date :  today,
      s_name : req.body.sname,
      s_mobile: req.body.smobile,
      s_address: req.body.saddress,
      user_id: req.body.user_id
    }
    var data = OrderMasterModel(mybodydata);
    data.save(function(err) {
        if (err) {
          //res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Data Error" , "data":err}));
          console.log("Error in Insert Record");
        } else {
          console.log("Order Master Added " + data._id);
          global.lasteinsertid1 = data._id;
         
          // res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Record Added", "data": ''}));
        }
    })

    //ordermasterid = myid;
    CartModel.find({user_id:userid},function(err, rows){

      for (var i = 0; i < rows.length; i++) {
        console.log("Loop "+ global.lasteinsertid1);
              const mybodydata = {
                order_id : global.lasteinsertid1,
                p_name: rows[i].p_name,
                p_price: rows[i].p_price,
                p_qty: rows[i].p_qty,
                user_id : userid
                }
                console.log(mybodydata);
              var data = OrderDetailsModel(mybodydata);
              data.save(function(err) {
                  if (err) {
                  //  res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Data Error" , "data":err}));
                    console.log("Error in Insert Record");
                  } else 
                  {
                      console.log("Record Added");
                     // res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Record Added", "data": ''}));
                  }
                });
        }
        res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Record Added", "data": ''}));
        CartModel.collection.drop();

  });
});





  router.post('/change-password-api', function(req, res, next) {
    console.log("Change Password "+req.body);
    user_id = req.body.user_id;
    newPassword = req.body.user_new_password;
 
    console.log(user_id + newPassword);
   
    UserModel.findOneAndUpdate({ "_id": user_id }, {$set: {"user_password": newPassword}}, function (err) {
      if (err) {
        res.send(JSON.stringify({"status": 500,"flag": 0, "message": "Data Error" , "data":err}));
        console.log("Error in Insert Record");
      } else {
         console.log("Record Added");
         res.send(JSON.stringify({"status": 200,"flag": 1, "message": "Record Added", "data": ''}));
      }
  })
  });
  
module.exports = router;