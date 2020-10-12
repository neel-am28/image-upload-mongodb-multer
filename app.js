const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
require("dotenv").config();
const Image = require("./imageModel");

const app = express();

const port = process.env.PORT || 4000;

mongoose.connect(
  process.env.MONGO_URI,
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

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("image");

const imgData = Image.find({});


// display image
app.get("/", (req, res) => {
    imgData.exec((err, data) => {        
      if (err) throw err;
      res.render("index", { records: data });
    });
  });

// post image
app.post("/", upload, (req, res, next) => {
    const name = req.body.name;
    const desc = req.body.desc;
    const img = req.file.filename;
    
    const imageDetails = new Image({
        name: name,
        desc: desc,
        img: img 
    });
    
    imageDetails.save((err, doc) => {
        if(err) throw err;
        imgData.exec((err, data) => {
            res.render('index', { records: data });
        });
    });
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Listening on port ${port}`);
});