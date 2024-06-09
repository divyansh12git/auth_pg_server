import express from "express";
import bodyParser from "body-parser";

import { Express,Request,Response } from "express";
import authrouter from "./authentication"; 
import dbRouter from "./postgre"

require('dotenv').config();
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(authrouter);
app.use(dbRouter);

const port:String|Number=process.env.PORT || 4532;

var obj:Object={
    name:"Divyansh8888  Gupta",
};

app.on("mount",()=>console.log("Yippi"));

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json(obj);
});


app.listen(port,()=>console.log(`Server is running on Port : ${port} `))