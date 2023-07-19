require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const handleLogout = async (req, res) =>{
    const cookies = req.cookies;

    if(!cookies?.jwt){
        return res.sendStatus(204);
    }
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken});

    if(!foundUser){
        res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'none'});
        return res.sendStatus(204);//unauthorized
    }

    foundUser.refreshToken = "";
    await foundUser.save();
    res.clearCookie('jwt', {httpOnly: true, secure: true, sameSite: 'none'});
    res.sendStatus(204);

}

module.exports = {handleLogout};



