import { Router, Request, Response } from "express";
import {Client} from "pg";

import { UserDataForSignIn } from "./types";

const dbRouter=Router();

const q1=`SELECT * FROM flags`;

const connectToDb=async():Promise<Client>=>{
    const client:Client=new Client({
        user:"postgres",
        host:"localhost",
        database:"world",
        password:"Div@postgres",
        port:"5433"
    });
    await client.connect().then(()=>{
        console.log("db is connected");
    }).catch((err:Error)=>{
        console.log(err);
    })
    
    return client;
    
}

const closeConnection=async(db:Client)=>{
    await db.end().then(()=>console.log("Connection closed"))
                  .catch((err:Error)=>console.log(err));            
}

const insertUser=async(db:Client,userdata:UserDataForSignIn):Promise<boolean>=>{
    
    const q:string=`INSERT INTO userdata(username,password_hash) VALUES($1,$2)`
    const data:Array<string>=[userdata.username,userdata.password];
    let dataUploaded=false;
    let response:string=await db.query(q,data)
                        .then(()=>{ 
                                dataUploaded=true;
                                console.log("user added succesfully")
                            })
                        .catch((err)=>{console.log(err)});

    
    return dataUploaded;
}

const finduser=async(db:Client, username:string):Promise<UserDataForSignIn>|null=>{

    console.log("HI");
    const qu=`SELECT * from userdata WHERE username=$1`;
    
    let User:UserDataForSignIn={password:"",username:""};

    try{
        const data=await db.query(qu,[username]);
        const row=data.rows[0];
        
        if(row){
            User.username=row.username;
            User.password=row.password_hash;
        }

    }catch(err){
        console.log(err);
    }
    return User;
}

dbRouter.get('/db',async(req:Request,res:Response)=>{
    const db:Client=await connectToDb();
    await closeConnection(db);
    res.send("200");
    }  
);


export {
    closeConnection,
    connectToDb,
    insertUser,
    finduser
};
export default dbRouter; 