const slot = require('../models/slotModel');

const getAllSlot = async (req, res) => {
    try{
        const allSlot = await slot.find();
        res.status(200).json(allSlot);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}

const getSlotById = async (req, res) => {
    try{
        const slot = await slot.findById(req.params.id);
        res.status(200).json(slot);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}

const createSlot = async (req, res) => {
    const slot = req.body;
    const newSlot = new slot(slot);
    try{
        await newSlot.save();
        res.status(201).json(newSlot);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

const updateSlot = async (req, res) => {
    const slot = req.body;
    try{
        const updatedSlot = await slot.findByIdAndUpdate(req.params.id, slot, {new: true});
        res.status(200).json(updatedSlot);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

const deleteSlot = async (req, res) => {
    try{
        await slot.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Slot deleted successfully"});
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

module.exports = {getAllSlot, getSlotById, createSlot, updateSlot, deleteSlot};