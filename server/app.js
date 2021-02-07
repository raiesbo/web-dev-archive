require('dotenv').config({ path: __dirname + '/.env' })
const mongoose = require("mongoose");
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const projectsRoutes = require("./routes/projectsRoutes");
const cookieParser = require("cookie-parser");
// const { requireAuth, checkUser } = require("./middleware/authMiddleware")
const cors = require('cors');

const app = express();


/////////////////
// middlewares //
/////////////////
const corsOptions = {
	origin: "https://archive.raiesbo.com",
	optionsSuccessStatus: 200
}

app.use(express.json()); // body-parser from express
app.use(cookieParser());
app.use(cors(corsOptions));


//////////////
// database //
//////////////

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log("connected to DB"))
	.catch((err) => console.log(err));


////////////
// routes //
////////////

// app.use('/', express.static('./public'));
// app.get('/', (req, res) => { res.sendFile(__dirname + '/public/index.html')});
// app.get('/admin/projects', requireAuth, (req, res) =>  res.send("trololo") );
// app.get("*", checkUser);
app.get('/', (req, res) => { res.send("webDevArchive API") });

app.use(authRoutes);
app.use(projectsRoutes);




app.listen(process.env.PORT || 5000);