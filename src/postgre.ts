import { Router, Request, Response } from "express";
import {Client} from "pg";

import { UserDataForSignIn } from "./types";

const dbRouter=Router();
const db:Client=new Client({
    user:"postgres",
    host:"localhost",
    database:"world",
    password:"Div@postgres",
    port:"5433"
});


const q1=`SELECT * FROM flags`;


const connectToDb=async():Promise<Client>=>{

    await db.connect().then(()=>{
        console.log("db is connected");
    }).catch((err:Error)=>{
        console.log(err);
    })
    
    let r=await db.query(q1);
    // console.log(r.rows[0]);

    return db;
    
}

const closeConnection=async(db:Client)=>{
    await db.end().then(()=>console.log("Connection closed"))
                  .catch((err:Error)=>console.log(err));
}

const insertUser=async(userdata:UserDataForSignIn):Promise<string>=>{
    const db:Client=await connectToDb();
    const q:string=`INSERT INTO userdata(username,password_hash) VALUES($1,$2)`
    const data:Array<string>=[userdata.username,userdata.password];
    let response:string=await db.query(q,data).then(()=>{console.log("user added succesfully")})
                                                .catch((err)=>{console.log(err)});
    closeConnection(db);
    
    return response;
}


dbRouter.get('/db',async(req:Request,res:Response)=>{
    const db:Client=await connectToDb();
    
    await closeConnection(db);
    res.send("200");
    }  
);


export {closeConnection,connectToDb,insertUser};
export default dbRouter; 