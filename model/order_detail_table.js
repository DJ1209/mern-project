var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
  order_id:String,
  order_date:String,
  p_name:String,
  p_price:String,
  p_qty:String,
  user_id:String
});

module.exports = mongoose.model('orderdetails', myschema);