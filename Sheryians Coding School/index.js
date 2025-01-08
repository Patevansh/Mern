import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir(`files`, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error reading files");
    }
    console.log(files);
    res.render("index", { files: files });
  });
});

app.get("/:name", (req, res) => {
    fs.readFile(`./files/${req.params.name}`, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error reading file");
        }
        res.send(data);
    });
});
app.post("/create", (req, res) => {
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error writing file");
    }
    res.redirect("/");
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
