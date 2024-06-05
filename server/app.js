const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes=require("./routes/authRoute")
const cookieParser = require("cookie-parser");
const {DB_LINK}=require("./credentials")

app=express()

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

mongoose.connect(DB_LINK)
.then((db) =>console.log("database connected!!"))
.catch(err => console.log(err))


app.use(express.json())
app.use(cookieParser());
app.use("/",authRoutes)


app.listen(8000, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Server Started Successfully.");
    }
  });
