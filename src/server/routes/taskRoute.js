const express = require('express')
const router = express.Router()
const TaskModel = require("../models/taskModel")


router.get("/get_tasks", (req,res)=>{
    TaskModel.find({})
        .then(foundTaskModels => res.json(foundTaskModels))
        .catch(err=>console.log(err))
})


router.delete("/delete_task/:id",(req,res)=>{
    TaskModel.findByIdAndDelete({_id: req.params.id})
        .then(item=>res.json(item))
        .catch((err)=>console.log(err))
})

router.patch("/update_task_name/:id",(req,res)=>{
    console.log(req.body)
    TaskModel.findByIdAndUpdate({_id: req.params.id}, {name: req.body.name})
        .then(item=>res.json(item))
        .catch((err)=>console.log(err))
})

router.patch("/update_task_state/:id",(req,res)=>{
    TaskModel.findByIdAndUpdate({_id: req.params.id}, {completed: !req.body.completed})
        .then(item=>res.json(item))
        .catch((err)=>console.log(err))
})

router.post("/create_task",(req, res)=>{
    const newTaskModel = new TaskModel(req.body)
    newTaskModel.save((error)=>{
        if (error) {
            console.log(error)
        } else {
            console.log('New task has been saved:', req.body)
        }
    })
    return res.json()
})

module.exports = router