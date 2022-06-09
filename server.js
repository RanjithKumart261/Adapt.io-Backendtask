const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const authRoute = require('./routes/auth.route');
const taskRoute = require('./routes/task.route');

const mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = process.env.DB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });
 //Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.json('Hello World!');
});

app.use('/api/auth', authRoute);
app.use('/api/tasks', taskRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});