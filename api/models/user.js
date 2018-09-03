const mongoose = require('mongoose');



//Please edit the schema as required for you. Also make sure you change the fields in controller/user.js add add_user function
const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    imei : {type: String, unique: true, required: true},
    phone : {type: String, unique: true, required: true},
    email : {type: String, unique: true},
    password : {type: String, required: true},
    username : {type: String, unique: true, required: true}
}, {collection : 'user-data'});

userSchema.index({location : '2dsphere'});

module.exports = mongoose.model('User', userSchema);