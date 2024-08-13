const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes=require("./routes/authRoute")
// const reelRoutes=require("./routes/postRoutes")
const postRoutes=require("./routes/postRoutes")
const userRoutes=require("./routes/userRoutes")
const commentRoutes=require("./routes/commentRoutes")
const cookieParser = require("cookie-parser");
const {DB_LINK}=require("./credentials")

app=express()

mongoose.connect(DB_LINK)
.then((db) =>console.log("database connected!!"))
.catch(err => console.log(err))

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json())
app.use(cookieParser());

app.use("/",authRoutes)
app.use("/posts",postRoutes)
// app.use("/reels",reelRoutes)
app.use("/comments",commentRoutes)
app.use("/user",userRoutes)

app.listen(8000, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Server Started Successfully.");
    }
  });
