const Employee = require('../models/imagesModel');

// show the list of empliyees

const index = (req, res, next) => {
    Employee.find()
        .then((response) => {
            res.json({response});
        })
        .catch((error) => {
            res.json({ message: "An error occured"});
        })
}

// show single employee

const show = (req, res, next) => {
    let employeeID = req.body.employeeID;
    Employee.findById(employeeID)
        .then((response) => {
            res.json({response});
        })
        .catch((error) => {
            res.json({ message: "An error occured"});
        });
}

// post employee

const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    });
    if(req.file){
        employee.avatar = req.file.path
    }
    employee.save()
        .then((response) => {
            res.json({message: "Employee added successfully"});
        })
        .catch((error) => {
            res.json({ message: "An error occured"});
        });
}

// update employee

const update = (req, res, next) => {
    let employeeID = req.body.employeeID;
    let updateData = {
        ame: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, { $set : updateData})
        .then(() => {
            res.json({ message: "Employee upadated successfully"});
        })
        .catch((error) => {
            res.json({ message: "An error occured"});
        });
}

// delete an employee

const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID;
    Employee.findByIdAndRemove(employeeID)
    .then(() => {
        res.json({ message: "Employee deleted successfully"});
    })
    .catch((error) => {
        res.json({ message: "An error occured"});
    });
}

// export all functions

module.exports = {
    index, show, store, update, destroy
}
