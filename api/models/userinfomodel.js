const mongoose=require('mongoose');

const userInfoSchema=new mongoose.Schema({
    Name:{
        required:true,
        type:String
    },
    SID:{
        required:true,
        type: Number
    },
    Contact:{
        required:true,
        type:Number
    },
    Email:{
        required:true,
        type:String
    },
    Year:{
        required:true,
        type:Number
    },
    Roles:{
        required:true,
        type:String
    }

});


module.exports=mongoose.model('UserInfo', userInfoSchema);