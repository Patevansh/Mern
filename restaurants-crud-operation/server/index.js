// import http from 'http';

// const server = http.createServer((req,res)=>{
//     if(req.method==='GET'&&req.url==='/vansh'){
//         res.writeHead(200,{'Content-Type':'text/plain'})
//         res.end("index.html");
//     }else{
//         res.writeHead(404,{'Content-Type':'text/plain'})
//         res.end("Not Found");
//     }
// });
// server.listen(3000,()=>{
//     console.log("Server is running on http://localhost:3000");
// });

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename); 
const app=express();

const port=process.env.PORT;
app.use(express.static(__dirname+"/views"));


app.use((req,res,next)=>{
    const secretCode=req.query.secret;
    if(secretCode==='1234'){
        req.isAuthorized=true;
    }else{
        req.isAuthorized=false;
    }
    next();
});

app.get("/auth",(req,res)=>{
    if(req.isAuthorized){
        res.sendFile(__dirname+"/views/index.html")
    }else{
        res.send("unauthorized ");
    }
})

app.listen(port,()=>{
    console.log(`Server is runnung on http://localhost:${port}/auth`);
})