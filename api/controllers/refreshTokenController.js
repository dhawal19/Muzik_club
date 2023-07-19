require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const handleRefreshToken = async (req, res) =>{
    const cookies = req.cookies;

    if(!cookies?.jwt){
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({refreshToken});

    if(!foundUser){
        return res.sendStatus(401);//unauthorized
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) =>{
            if(err || foundUser.username !== decoded.username){
                return res.sendStatus(403); //forbidden
            }
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },                
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '5m'}
            );
            res.json({accessToken});
        }
    )
}

module.exports = {handleRefreshToken};



