var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SlideSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    template: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    bookmark: {
        type: Boolean,
        required: true
    },
    displaySeconds: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model('Slide', SlideSchema);