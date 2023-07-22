const mongoose = require('mongoose');

const feedBackSchema = new mongoose.Schema({
    performanceName:{
        required:true,
        type:String
    },
    time:{
        required: true,
        type: Array
    }
});

module.exports = mongoose.model('feedback', feedBackSchema);