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

app.use("/auth", authRoutes)
app.use("/posts", postRoutes)
app.use("/reels",reelRoutes)
app.use("/post-comment", commentPostRoutes)
app.use("/reel-comment", commentReelRoutes)
app.use("/user", userRoutes)

app.listen(8000, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Server Started Successfully.");
    }
  });
