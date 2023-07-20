const performance = require('../models/performancesDataModel');

const getAllPerformance = async (req, res) => {
    try{
        const allPerformance = await performance.find();
        res.status(200).json(allPerformance);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}

const getPerformanceById = async (req, res) => {
    try{
        const performance = await performance.findById(req.params.id);
        res.status(200).json(performance);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}

const createPerformance = async (req, res) => {
    const performance = req.body;
    const newPerformance = new performance(performance);
    try{
        await newPerformance.save();
        res.status(201).json(newPerformance);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

const updatePerformance = async (req, res) => {
    const performance = req.body;
    try{
        const updatedPerformance = await performance.findByIdAndUpdate(req.params.id, performance, {new: true});
        res.status(200).json(updatedPerformance);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

const deletePerformance = async (req, res) => {
    try{
        await performance.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Performance deleted successfully"});
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

module.exports = {getAllPerformance, getPerformanceById, createPerformance, updatePerformance, deletePerformance};