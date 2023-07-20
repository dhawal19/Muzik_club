const express = require('express');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const verifyRoles = require('./middleware/verifyRoles');
const { userInfo } = require('os');
const connectDB = require('./config/connectDB');

const app = express();
const port = process.env.PORT || 3000;

connectDB();

//middleware for handling credentials and fetch cookie credentials
app.use(credentials); 

//middleware for handling cors
app.use(cors(corsOptions));

//middleware for parsing body and json
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//middleware for parsing cookies
app.use(cookieParser());

//middleware for serving static files
app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/login', express.static(path.join(__dirname, 'public')));

//routes
app.use('/', require('./routes/root'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

//routes for crud api
app.use('/userInfo', require('./routes/userinfo'));
app.use('/attendance', require('./routes/attendance'));
app.use('/performances', require('./routes/performances'));

//add verify roles middleware to the routes which require roles based authorization in future

app.use(verifyJWT);
//middleware for verifying JWT used in all routes below
// routes that require JWT ...
// app.use('/admin', require('./routes/admin'));
// app.use('/user', require('./routes/user'));
// app.use('/eb',  require('./routes/eb'));

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



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});