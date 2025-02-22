const mongoose = require('mongoose')

const employeeModel = mongoose.Schema({
    name: String,
    dept: String,
    salary: String
})

module.exports = mongoose.model('mytests', employeeModel)