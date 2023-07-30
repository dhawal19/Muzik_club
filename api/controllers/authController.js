require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const handleLogin = async (req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json(error = "Please fill all the fields");
    }

    const foundUser = await User.findOne({email});

    if(!foundUser){
        return res.status(400).json(error = "User not found");
    }

    //implement bcrypt here to compare password
    const match = password === foundUser.password;

    if(match){
        //create access token and refresh token
        
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {UserInfo: {email, roles}},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1d', algorithm: 'HS256'}
        );
        const refreshToken = jwt.sign(
            {email: foundUser.email}, 
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        
        //save refresh token to database
        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        //send access token to client and refresh token to cookie
        res.cookie('jwt', refreshToken, {maxAge: 24*60*60*1000,httpOnly: true, secure: true, sameSite: 'none'});
        foundUser.password = undefined;
        foundUser.refreshToken = undefined;
        res.json({foundUser, accessToken});
    }
    else{
        res.status(401).json(error = "Wrong password");
    }
}

module.exports = {handleLogin};