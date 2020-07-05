var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    user_id: String,
    product_id: String,
    p_name: String,
    p_price: String,
    p_qty: String,
    p_image : String
});

module.exports = mongoose.model('cart', myschema);