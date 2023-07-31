const eventModel = require('../models/eventModel');

const getEvents = async (req, res) => {
    try{
        const events = await eventModel.find();
        res.status(200).json(events);
    }
    catch(error){
        res.status(404).json({message:error.message});
    }
}

const createEvent = async (req, res) => {   
    const event = req.body;
    const newEvent = new eventModel(event);
    try{
        await newEvent.save();
        res.status(201).json(newEvent);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

const updateEvent = async (req, res) => {
    const event = req.body;
    try{
        const updatedEvent = await eventModel.findByIdAndUpdate(req.params.id, event, {new: true});
        res.status(200).json(updatedEvent);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}


const deleteEvent = async (req, res) => {
    const event = req.body;
    try{
        const deletedEvent = await eventModel.findByIdAndDelete(req.params.id, event);
        res.status(200).json(deletedEvent);
    }
    catch(error){
        res.status(409).json({message:error.message});
    }
}

module.exports = {getEvents, createEvent, updateEvent, deleteEvent};
