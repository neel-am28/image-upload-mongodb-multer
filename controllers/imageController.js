const Image = require("../models/imageModel");

const imgData = Image.find({});

// display image
const display_blogs = (req, res) => {
  imgData.exec((err, data) => {
    if (err) throw err;
    res.render("imageView", { records: data });
  });
};

// add new image
const add_blogs = (req, res) => {
  const name = req.body.name;
  const desc = req.body.desc;
  const img = req.file.filename;

  const imageDetails = new Image({
    name: name,
    desc: desc,
    img: img,
  });

  imageDetails.save((err, doc) => {
    if (err) throw err;
    imgData.exec((err, data) => {
      res.render("imageView", { records: data });
    });
  });
};

module.exports = {
  display_blogs,
  add_blogs,
};
