var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var myschema = new Schema({
  order_date:String,
  s_name:String,
  s_mobile:String,
  s_address:String,
  user_id:String
});

module.exports = mongoose.model('ordermaster', myschema);