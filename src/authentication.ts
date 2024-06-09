import { Router } from "express";
import { Express,Request,Response } from "express";
import {UserDataForSignIn}  from "./types";
import { connectToDb,closeConnection,insertUser, finduser } from "./postgre";
import {generateHash,compareHash} from "./enc_hashing/hashing";

const authrouter=Router();

authrouter.get("/auth",(req:Request,res:Response)=>{
    res.send("This is the auth route");
})

authrouter.post("/signup",async(req:Request,res:Response)=>{

    const client=await connectToDb();
    const userData:UserDataForSignIn | null=req.body;
    const dbData:UserDataForSignIn=await finduser(client,userData.username);
    
    console.log(dbData.username);
    if(dbData.username.length!=0){
        res.send("User already exist").status(400);
        await closeConnection(client);
        return;
    }

    const hash=await generateHash(userData.password);
    
    userData.password=hash;

    let dataUploaded:boolean=false;
    try{
        dataUploaded=await insertUser(client,userData);
    }catch(err){
        console.log(err);
    }
    
    await closeConnection(client);

    dataUploaded?res.sendStatus(200):res.sendStatus(400);
    
});

authrouter.post("/signin",async(req:Request,res:Response)=>{
    
    const userInput:UserDataForSignIn | null=req.body;
    if(!userInput.username.length){
        res.send("please enter correct username");
        return ;
    }
    const client=await connectToDb();

    const dbData:UserDataForSignIn=await finduser(client,userInput.username);

    const valid:boolean=await compareHash(userInput.password,dbData.password);

    await closeConnection(client);

    if(valid){
        res.send("success").status(200);
    }else{
        res.send("failed").status(400);
    }

})


export default authrouter;