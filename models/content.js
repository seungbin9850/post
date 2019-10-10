const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Content = new Schema({
    name: String,
    title: String,
    text: String,
});

Content.statics.create = function (name, title, text) {
    const content = new this({
        name,
        title,
        text,
    });

    return content.save();
}

Content.statics.findOneByid = function(_id) {
    return this.findOne({
        _id
    }).exec();
}

Content.statics.findAll = function() {
    return this.find().exec();
}

module.exports = mongoose.model('Content', Content);