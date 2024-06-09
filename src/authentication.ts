import { Router } from "express";
import { Express,Request,Response } from "express";
import {UserDataForSignIn}  from "./types";
import { insertUser } from "./postgre";


const authrouter=Router();

authrouter.get("/auth",(req:Request,res:Response)=>{
    res.send("This is the auth route");
})

authrouter.post("/signup",(req:Request,res:Response)=>{
    const userData:UserDataForSignIn | null=req.body;
    

    insertUser(userData);
    
    res.send("Hi");
});


export default authrouter;