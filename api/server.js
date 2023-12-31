const express = require('express');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const emailHandler = require('./middleware/emailHandler')
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const verifyRoles = require('./middleware/verifyRoles');
const connectDB = require('./config/connectDB');
const cron = require("node-cron");
const createSlots = require('./feature/algorithm');

const app = express();
const port = process.env.PORT || 3500;

connectDB();

//middleware for handling credentials and fetch cookie credentials
app.use(credentials); 

//middleware for handling cross origin requests sent from client
app.use(cors(corsOptions));

//middleware for parsing body and json
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//middleware for parsing cookies
app.use(cookieParser());
// cron.schedule('1 1 20 * * *', () => {
//     emailHandler();
// })

//to create slots
// cron.schedule('1 15 * * * *', () => {
// createSlots();  
// });

//implement all other middlewares here
//app.use(emailGenerator);

//middleware for serving static files
app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/login', express.static(path.join(__dirname, 'public')));

//routes
app.use('/', require('./routes/root'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

//add verify roles middleware to the routes which require roles based authorization in future

app.use(verifyJWT);
app.use('/userInfo', require('./routes/userinfo'));
app.use('/attendance', require('./routes/attendance'));
app.use('/performance', require('./routes/performance'));
app.use('/slot', require('./routes/slot'));
app.use('/feedback', require('./routes/feedback'));
app.use('/event', require('./routes/event'));
//middleware for verifying JWT used in all routes belowroutes that require JWT ...


//middleware for handling errors
app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'public', '404.html'));
    }
    else if(req.accepts('json')){
        res.json({error: 'Not found'});
    }
    else{
        res.type('txt').send('Not found');
    }
});

//middleware for handling errors
app.use(errorHandler);

// middleware for sending email

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});