var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    isDisplayed: { type: Boolean, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);