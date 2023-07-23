const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles : {
        User : {
            type: Number,   
            default: 2001
        },
        Admin : Number, //1000
        EB : Number //1001
    },

    refreshToken: {
        type: String,
        default: null,
    }
});

const User = new mongoose.model("user", userSchema);

module.exports = User;
