import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app=express();
app.use(cookieParser());

app.get("/",(req,res)=>{
    const cookie=jwt.sign({name:"vansh"},"random");
    res.cookie("token",cookie,{maxAge:60*1000});
    res.send("Hello World");
})

app.get("/login",(req,res)=>{
    if(req.cookies.token){
        const decoded=jwt.verify(req.cookies.token,"random")
        console.log(decoded.name);
        res.send("Logged in");
    }
})
app.listen(5000,()=>{
    console.log("Server running on 5000");
});