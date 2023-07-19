const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1/userDB", {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected to userDB");
    } catch (error) {
        console.log(error);
    }
}
connectDB();

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
        Admin : Number,
        EB : Number
    },

    refreshToken: {
        type: String,
        default: null,
    }
});

const User = new mongoose.model("user", userSchema);

module.exports = User;
