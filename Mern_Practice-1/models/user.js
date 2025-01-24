import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose
  .connect(process.env.MONGOSE_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

const userSchema = new mongoose.Schema({
    ProductID:{
        type: Number,
        required: true,
        unique: true,
    },
    ProductName:{
        type: String,
        required: true,
    },
    ProductPrice:{
        type: String,
        required: true,
    },
    ProductCategory:{
        type: String,
        required: true,
    },
    ProductDescription:{
        type: String,
        required: true,
    }
    });

const User = mongoose.model("Mern_Practice-1", userSchema);

export default User;