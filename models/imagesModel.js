const mongoose = require('mongoose');
const imageSchema = mongoose.Schema({
    name: {
        type: String
    },
    designation: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    age: {
        type: String
    },
    avatar:{
        type: String
    }  
}, { timestamps: true});

module.exports = mongoose.model("multiple-image", imageSchema);

 