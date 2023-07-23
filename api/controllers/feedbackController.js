const feedback = require('../models/feedbackModel');

const createFeedback = async (req, res) => {
    const feedback = req.body;
    const newFeedback = new feedback(feedback);
    try{
        await newFeedback.save();
        res.status(201).json(newFeedback);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

const updateFeedback = async (req, res) => {
    const feedback = req.body;
    try{
        const updatedFeedback = await feedback.findByIdAndUpdate(req.params.id, feedback, {new: true});
        res.status(200).json(updatedFeedback);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

const deleteFeedback = async (req, res) => {
    try{
        await feedback.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "feedback deleted successfully"});
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

module.exports = {createFeedback, updateFeedback, deleteFeedback};