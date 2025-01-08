import express from "express";
import userModel from "./usermodel.js";

const app = express();

app.get("/create", async (req, res) => {
  let createduser = await userModel.create({
    name: "Shubham",
    username: "Shubham",
    email: "Shubham@gamil.com",
  });
  res.send(createduser);
});
app.get("/update", async (req, res) => {
  let updateduser = await userModel.findOneAndUpdate(
    { name: "Shubham" },
    { username: "shubham123" },
    { new: true }
  );
  res.send(updateduser);
});
app.get("/read", async (req, res) => {
    let user = await userModel.find();
    res.send(user);
});

app.get("/delete", async (req, res) => {
    let deleteduser = await userModel.findOneAndDelete({ name: "Shubham" });
    res.send(deleteduser);
});
app.listen(3000, () => {
  console.log("server is running");
});
