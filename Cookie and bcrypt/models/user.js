import mongoose from "mongoose";

mongoose
  .connect("mongodb+srv://bvjv656:vbfTSR78a6ASozFe@cluster0.6rh0n.mongodb.net/Chat-app-mern?retryWrites=true&w=majority")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    });

const users = mongoose.model("cookies", userSchema);

export default users;