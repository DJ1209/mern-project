var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
const fileUpload = require('express-fileupload');
var mongoose = require('mongoose');
var cors = require('cors')


//Db Connection Start 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://disha:disha123@ds135433.mlab.com:35433/db_test', { useNewUrlParser: true })
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err))
 //DB Connection End


 var indexRouter = require('./routes/index');
/*Admin Route*/
var accountRouter = require('./routes/admin/account');
var categoryRouter = require('./routes/admin/category');
var subcategoryRouter = require('./routes/admin/subcategory');

var productsRouter = require('./routes/admin/products');
var userRouter = require('./routes/admin/user');

var cartRouter = require('./routes/admin/cart');

var OrderMasterRouter = require('./routes/admin/ordermaster');
var OrderDetailsRouter = require('./routes/admin/orderdetails');
var ReportsRouter = require('./routes/admin/reports');

/*API Route*/
var userApiRouter = require('./routes/api/userapi');

/*Admin Route*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(cors())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use('/', indexRouter); 

app.use('/admin/', accountRouter);
app.use('/admin/category', categoryRouter);
app.use('/admin/subcategory', subcategoryRouter);
app.use('/admin/product', productsRouter);
app.use('/admin/users', userRouter);
app.use('/admin/cart', cartRouter);
app.use('/admin/ordermaster', OrderMasterRouter);
app.use('/admin/orderdetails', OrderDetailsRouter);
app.use('/admin/reports', ReportsRouter);
//API
app.use('/api/userapi', userApiRouter);
 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
