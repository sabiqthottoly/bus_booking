const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    sex: String,
    age: Number,
    phone: { type: String, unique: true },
    email: { type: String, unique: true },
});


module.exports = mongoose.model('User', UserSchema);