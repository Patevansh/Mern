import express from "express";
import User from "./models/user.js";


const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());            
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read",async (req, res) => {
    let users=await User.find()
    res.render("read",{users});
});

app.get("/edit/:userid",async (req, res) => {
    let user =await User.findOne({_id:req.params.userid});
    res.render("edit",{user});
});

app.post("/update/:id", async (req, res) => {
    let {name, email, image} = req.body;
    let updatedUser = await User.findOneAndUpdate({_id:req.params.id},{name,email,image},{new:true});
    res.redirect("/read");
});

app.post("/create", async (req, res) => { 
    let {name, email, image} = req.body;
    let createdUser = await User.create({name,email,image})
    res.redirect("/read");
});
app.get("/delete/:id", async (req, res) => {
    let users=await User.findOneAndDelete({_id:req.params.id});
    res.redirect("/read");
});

app.listen(3000, () => {
  console.log("server is running");
});