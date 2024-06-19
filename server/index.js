import express from "express";
import cors from "cors";

import mongoose from 'mongoose'
import authRoutes from "./routes/blog.js";
const app=express();
const port=3000;

// connectToMongo();
const connection_url = "mongodb+srv://anant:2jvw8VHYKdCX9BeU@cluster0.3h6loaz.mongodb.net/"
// mongodb://127.0.0.1/test 
mongoose.set('strictQuery', true);
mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true,family:4})
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err)=>{
        console.log(err);
    })
    app.use(cors());
app.use(express.json());     //express.json is a built-in  middleware func. that converts the request body to JSON//
app.use(express.static("public/upload"));

app.get("/",(req,res)=>{
    res.send("api is running.....")
});
app.use("/api/v1",authRoutes);
app.listen(port,()=>{
    console.log(`api is running at port:${port}`);
});