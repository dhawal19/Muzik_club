const mongoose=require('mongoose');

const performancesDataSchema=new mongoose.Schema({
    performanceName:{
        required:true,
        type:String
    },
    count:{
        required:true,
        type:Number
    },
    score:{
        required:true,
        type:Number
    },
    members:{
        required:true,
        type: Array
    }
});

module.exports=mongoose.model('performancesdata', performancesDataSchema);