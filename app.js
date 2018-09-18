const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to Database
mongoose.connect(config.database, { useNewUrlParser: true });

//Conection Message
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

mongoose.connection.on('error', (err) => {
    console.error('Database error ' + err);
});

//Initialize variable with express
const app = express();

const users = require('./routes/users');

//Port number
// const port = 3000;

//Heroku configuration
const port = process.env.PORT || 8080;


//CORS Middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, './public')));

//Body Parser Middleware, grab the content of a request, a form, etc
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});

//Any other router it is gone get send to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start Server
app.listen(port, () => {
    console.log("Server stated on port " + port);
    
});