var express = require('express');
var router = express.Router();

var AdminModel = require('../../model/admin_table');
var add1 = new AdminModel({admin_name: 'admin',admin_mobile:'123465',admin_email:'admin',admin_password:'admin'});


/*Listing. */
router.get('/', function(req, res, next) {
  res.redirect('/admin/login');
});

router.get('/login', function(req, res, next) {
  res.render('admin/account/login', { title: 'Express' });
});

//Login Process  Method
router.post('/login', function (req, res, next) {
  var email = req.body.txt1;
  var password = req.body.txt2;
  console.log(req.body);
  AdminModel.findOne({ "admin_email": email }, function (err, db_users_array) {
    console.log("Find One " + db_users_array);
    if (db_users_array) {
      var db_email = db_users_array.admin_email;
      var db_password = db_users_array.admin_password;
    }
    console.log("db_users_array.admin_email " + db_email);
    console.log("db_users_array.admin_password " + db_password);
    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (db_email == email && db_password == password) {
      req.session.email = db_email;
      res.redirect('/admin/dashboard');
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }
  });
});


router.get('/dashboard', function(req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/admin/');
  }else{

    console.log("Home Called " + req.session.email);
    var myemail = req.session.email;
    console.log(myemail);
    //Auth
   
    res.render('admin/account/dashboard', { myemail: myemail });
  }
});


router.get('/changepassword', function(req, res, next) {
  res.render('admin/account/change-password', { title: 'Express' });
});

//Change Paassword Page Route
router.get('/change-password', function (req, res, next) {

  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/admin/login');
  }

  res.render('admin/account/change-password');
});

//Change Password Process Page
router.post('/change-password', function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/login');
  }
  console.log("Home Called " + req.session.email);
  var myemail = req.session.email;
  var opass = req.body.opass;
  var npass = req.body.npass;
  var cpass = req.body.cpass;
  AdminModel.findOne({ "admin_email": myemail }, function (err, db_users_array) {

    if (err) {
      console.log("Error in Old Password Fetch " + err);
    } else {
      console.log(db_users_array);
      if (opass == db_users_array.admin_password) {
        if (opass == npass) {
          res.end("New Password Must be Different then Old password");
        } else {
          if (npass == cpass) {
            AdminModel.findOneAndUpdate({ "admin_email": myemail }, {$set: {"admin_password": npass}}, function (err) {
              if(err)
              {
                res.end("Error in Update"+err);
              }else{ 
                res.send("Password Changed");
              }
            });
          } else {
            res.end("New Password and Confirm Password not match");
          }
        }
      } else {
        res.end("Old Password Not Match");
      }
    }
  });

});

router.get('/logout', function (req, res) {

  req.session.destroy();
  res.redirect("/");
});


router.get('/forgot-password', function(req, res, next) {
    res.render('admin/account/forgot-password', { title: 'Express' });
});


//Login Process  Method
router.post('/forgot-password', function (req, res, next) {

  var email = req.body.email; 

  console.log(req.body);
  AdminModel.findOne({ "admin_email": email }, function (err, db_users_array) {

    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.admin_email;
      var db_password = db_users_array.admin_password;

    }

    console.log("db_users_array.admin_email " + db_email);
    console.log("db_users_array.admin_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (db_email == email) {
     
      
      

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
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Forgot Password", // Subject line
    text: "Hello your password is "  + db_password, // plain text body
    html: "Hello your password is "  + db_password // html body
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.end("Password Sent on your Email");
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);


      
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

 
  });
});


router.get('/signup', function(req, res, next) {
  res.render('admin/account/add-admin');
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);
  //Create an Array 
  const mybodydata = {
    admin_name: req.body.txt1,
    admin_mobile: req.body.txt2,
    admin_email:req.body.txt3,
    admin_password: req.body.txt4
}
var data = AdminModel(mybodydata);
data.save(function(err) {
    if (err) {
      res.send("<h1> Error "+ err +"</h1>");
      console.log("Error in Insert Record");
    } else {
       console.log("Record Added");
        res.redirect('/admin/');
    }
})

});


/*Listing. */
router.get('/view', function(req, res, next) {
  AdminModel.find(function(err, db_users_array) {
    if (err) {
        console.log("Error in Fetch Data " + err);
      } else {
        //Print Data in Console
        console.log(db_users_array);
        //Render User Array in HTML Table
        res.render('admin/account/view-admin', { admnin_array : db_users_array });
      }
  });
});
module.exports = router;