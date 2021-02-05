require('dotenv').config({ path: __dirname + '/.env' })
const mongoose = require("mongoose");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware")
const cors = require('cors');

const app = express();


// middleware
app.use(express.json()); // body-parser from express
app.use(cookieParser());
app.use(cors());


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log("connected to DB"))
	.catch((err) => console.log(err));



// routes
// app.use('/', express.static('./public'));
// app.get('/', (req, res) => { res.sendFile(__dirname + '/public/index.html')});
app.get("*", checkUser);
app.get('/', (req, res) => { res.send("hello world") });
app.get('/admin/projects', requireAuth, (req, res) =>  res.send("trololo") );
app.use(authRoutes);





app.listen(process.env.PORT || 5000);