const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;

const app = express()
const uri = process.env?.MONGO_URL || 'mongodb://localhost:27017/project';

mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});
app.use(cors({
    origin: ["http://localhost:3000" , "http://0.0.0.0" ,],
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/user', require('./router/user'));
app.use('/api', require('./router/update'));

app.listen(port, () => {
    console.log("Server started at port",port);
});