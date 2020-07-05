var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    admin_name: String, 
    admin_mobile: String,
    admin_email: String,
    admin_password: String,   
    admin_joindate : {type: Date, default: Date.now},

});

module.exports = mongoose.model('admin', myschema);