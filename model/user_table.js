var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    user_name: String,
    user_gender: String,
    user_mobile: String,
    user_email: String,
    user_password: String,
    user_address: String,
    _location:
    {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'location'
    },
    user_isadmin: {type: String, default: '0'},
    user_joindate : {type: Date, default: Date.now},

});

module.exports = mongoose.model('users', myschema);