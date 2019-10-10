const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    username: String,
    password: String,
});

User.statics.create = function(name, username, password) {
    const user = new this({
        name,
        username, 
        password,
    });

    return user.save();
}

User.statics.findOneByUsername = function(username) {
    return this.findOne({
        username,
    }).exec();
}

User.methods.verify = function(password) {
    return this.password === password;
}

module.exports = mongoose.model('User', User);