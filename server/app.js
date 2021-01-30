require('dotenv').config({path:__dirname+'/.env'}) 
const mongoose = require("mongoose");
const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();


// middleware
app.use(express.json()); // body-parser from express


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log("connected to DB"))
	.catch((err) => console.log(err));



// routes
app.get('/', (req, res) => { res.send("hello world")});
app.use(authRoutes);





app.listen(process.env.PORT || 3000);