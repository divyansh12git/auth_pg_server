import express from "express";
import { Express } from "express";



require('dotenv').config();
const app=express();

const port=process.env.PORT;

var obj:Object={
    name:"Divyansh Gupta",
};

app.get("/name",(req,res)=>{
    res.send(obj);
})


app.listen(port,()=>console.log(`Server is running on Port : ${port} `))