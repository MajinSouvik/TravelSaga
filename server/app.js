const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes=require("./routes/authRoute")
const reelRoutes=require("./routes/reelRoutes")
const postRoutes=require("./routes/postRoutes")
const userRoutes=require("./routes/userRoutes")
const commentPostRoutes=require("./routes/commentPostRoutes")
const commentReelRoutes=require("./routes/commentReelRoutes")
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
require("dotenv").config()

const app=express()

mongoose.connect(process.env.DB_LINK)
.then((db) =>console.log("database connected!!"))
.catch(err => console.log(err))

// https://travelsaga-frontend.vercel.app
// https://travelsaga-frontend.vercel.app
// https://travelsaga-backend.vercel.app/auth/register
// http://localhost:3000
// https://travel-saga-frontend.vercel.app/login
// https://travel-saga-frontend.vercel.app
// const corsOptions = {
//   origin: 'http://localhost:3000', // Replace with your actual frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Content-Type', 'Authorization'],
//   credentials: true,
// };

// app.use(cors(corsOptions))

// app.options('*', cors(corsOptions)); 
app.use(cors())
app.use(express.json())
app.use(cookieParser());

app.use("/auth",  authRoutes)
app.use("/posts", postRoutes)
app.use("/reels", reelRoutes)
app.use("/post-comment", commentPostRoutes)
app.use("/reel-comment", commentReelRoutes)
app.use("/user",  userRoutes)

app.listen(8000, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Server Started Successfully.");
    }
  });
