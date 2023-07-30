const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    eventName:{
        required:true,
        type:String
    },
    eventDate:{
        default:"",
        type:String
    }
});

module.exports = mongoose.model('event', eventSchema);
