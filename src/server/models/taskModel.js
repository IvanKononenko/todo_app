const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    id: Number
})

const TaskModel = mongoose.model("Task", taskSchema)

module.exports = TaskModel