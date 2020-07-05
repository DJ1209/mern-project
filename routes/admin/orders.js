var express = require('express');
var router = express.Router();

/*Listing. */
router.get('/', function(req, res, next) {
  res.render('admin/order/display', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
    res.render('admin/order/add', { title: 'Express' });
});
module.exports = router;