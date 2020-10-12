const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const multer = require('multer');

const imageController = require("./controllers/imageController");
const app = express();

const port = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to mongodb");
  }
);

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

// code related to multer and storing image in uploads folder
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// .single('image') is the field name of input type file tag from html file
const upload = multer({ storage: storage }).single("image");

app.get('/', imageController.display_blogs);
app.post('/', upload, imageController.add_blogs);

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Listening on port ${port}`);
});