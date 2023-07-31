const mongoose=require('mongoose');

const slotSchema=new mongoose.Schema({
    performanceName:{
        required:true,
        type:String
    },
    members:{
        required:true,
        default:[],
        type: Array
    }, 
    time:{
        required:true,
        type:String
    }
});

module.exports=mongoose.model('slot', slotSchema);