const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config({path: __dirname+'/config/.env'});

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
	console.log("Connected to MongoDB...");
})

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercise', exerciseRouter);
app.use('/user', userRouter);
app.use(passport.initialize());
require('./config/passport')(passport);

app.listen(port, () => {
	console.log(`Server listening on port ${port}...`);
})
