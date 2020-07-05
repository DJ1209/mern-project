var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    user_name: String,
    user_email: String,
    user_contact: String,
    user_msg: String,

});

module.exports = mongoose.model('contact', myschema);