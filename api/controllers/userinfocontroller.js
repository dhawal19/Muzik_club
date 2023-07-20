const UserInfo = require('../models/userinfomodel');

const getAllUserInfo = async (req, res) => {
    try{
        const allUserInfo = await UserInfo.find();
        res.status(200).json(allUserInfo);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}

const getUserInfoById = async (req, res) => {
    try{
        const userInfo = await UserInfo.findById(req.params.id);
        res.status(200).json(userInfo);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}

const createUserInfo = async (req, res) => {
    const userInfo = req.body;
    const newUserInfo = new UserInfo(userInfo);
    try{
        await newUserInfo.save();
        res.status(201).json(newUserInfo);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

const updateUserInfo = async (req, res) => {
    const userInfo = req.body;
    try{
        const updatedUserInfo = await UserInfo.findByIdAndUpdate(req.params.id, userInfo, {new: true});
        res.status(200).json(updatedUserInfo);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

const deleteUserInfo = async (req, res) => {
    try{
        await UserInfo.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "User Info deleted successfully"});
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

module.exports = {getAllUserInfo, getUserInfoById, createUserInfo, updateUserInfo, deleteUserInfo};