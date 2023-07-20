require('dotenv').config();

const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

const connectDB = ()=>{
    mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });

    const database = mongoose.connection;

    database.on('error', (error) => console.log(error));
    database.once('connected', () => console.log('Connected to database'));
}

module.exports=connectDB;


