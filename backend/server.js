const express = require('express');
const connectDB = require('./config/db');
const formData = require('express-form-data');

require('colors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes.js');
const profiles = require('./routes/profiles.route');


const morgan = require('morgan');
const { forgotPassword, resetPassword } = require('./controllers/userController');
const { isResetTokenValid } = require('./security/Rolemiddleware');
const passport = require('passport')

const app = express();

// passport
app.use(passport.initialize())
require('./security/passport')(passport)
connectDB();


app.use(formData.parse());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));

app.post("/forgot-password", forgotPassword )
// router.post("/reset-password", resetPassword )
app.post("/reset-password",isResetTokenValid,  resetPassword )
app.use('/api/users', userRoutes);

app.use('/api/profile', profiles);

app.get('*', function(req, res){
  res.status(404).json({
    msg: "Api path not found."
  });
});

const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.red,
  ),
);



// hosted server https://news-app-native.herokuapp.com/