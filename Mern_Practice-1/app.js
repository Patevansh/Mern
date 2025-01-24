import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import User from './models/user.js';

dotenv.config();

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));
app.use(express.static(path.join(path.resolve(), 'public')));

app.get("/", async (req, res) => {
    let users = await User.find();
    res.render("index", { users });
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", async (req, res) => {
    let { ProductName, ProductPrice, ProductCategory, ProductDescription } = req.body;
    const result = await User.aggregate([{ $group: { _id: null, maxId: { $max: '$ProductID' } } }]);
    const maxId = result.length > 0 ? result[0].maxId : 0;
    const ProductID = maxId + 1;
    await User.create({ ProductID, ProductName, ProductPrice, ProductCategory, ProductDescription });
    res.redirect("/");
});

app.get("/update/:id", async (req, res) => {
    const user = await User.findOne({ ProductID: req.params.id });
    res.render("update", { user });
});

app.post("/update/:id", async (req, res) => {
    let { ProductName, ProductPrice, ProductCategory, ProductDescription } = req.body;
    let ProductID = req.params.id;
    await User.findOneAndUpdate({ ProductID }, { ProductID, ProductName, ProductPrice, ProductCategory, ProductDescription }, { new: true });
    res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
    await User.findOneAndDelete({ ProductID: req.params.id });
    res.redirect("/");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('Server is running on port ', port);
});
