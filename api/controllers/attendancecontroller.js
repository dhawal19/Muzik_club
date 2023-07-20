const attendance=require('../models/attendanceModel');

const getAllAttendance = async (req, res) => {
    try{
        const allAttendance = await attendance.find();
        res.status(200).json(allAttendance);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}

const getAttendanceById = async (req, res) => {
    try{
        const attendance = await attendance.findById(req.params.id);
        res.status(200).json(attendance);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}

const createAttendance = async (req, res) => {
    const attendance = req.body;
    const newAttendance = new attendance(attendance);
    try{
        await newAttendance.save();
        res.status(201).json(newAttendance);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

const updateAttendance = async (req, res) => {
    const attendance = req.body;
    try{
        const updatedAttendance = await attendance.findByIdAndUpdate(req.params.id, attendance, {new: true});
        res.status(200).json(updatedAttendance);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

const deleteAttendance = async (req, res) => {
    try{
        await attendance.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Attendance deleted successfully"});
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

module.exports = {getAllAttendance, getAttendanceById, createAttendance, updateAttendance, deleteAttendance};