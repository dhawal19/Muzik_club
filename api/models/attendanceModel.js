const mongoose=require('mongoose');

const attendanceSchema=new mongoose.Schema({

    eventName:{
        required:true,
        type:String
    },
    SID:{
        required:true,
        type: Number
    },
    attendance:{
        required:true,
        type:Number
    }
});

module.exports=mongoose.model('attendance', attendanceSchema);