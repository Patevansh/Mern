import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import users from './models/user.js';

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());



app.get('/', (req, res) => {
    res.render('index')
});

app.post("/create",(req,res)=>{
    let {name,email,password,age}=req.body;

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let createdUser=await users.create({
                name,
                email,
                password:hash,
                age
            });
            let token=jwt.sign({email},"sertyu");
            res.cookie("token",token);
            res.send(createdUser);
        });
    })
})

app.get("/login",(req,res)=>{
    res.render("login");
});
app.post("/login",async (req,res)=>{
    let user=await users.findOne({email:req.body.email});
    if(!user){
        return res.send("Something went wrong");
    }
    bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(result){
            let token=jwt.sign({email:user.email},"sertyu");
            res.cookie("token",token);
            res.send("Logged in");
        }else{
            res.send("Something went wrong");
        }
    })
});

app.post("/logout",(req,res)=>{
    res.clearCookie("token");
    res.send("Logged out");
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});