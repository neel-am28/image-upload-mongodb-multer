const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const EmployeeRoute = require('./routes/imageRoutes');
const path = require('path');
require("dotenv").config();

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Listening on port ${port}`);
});

// routes
app.use('/api/employee', EmployeeRoute);