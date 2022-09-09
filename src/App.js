import './App.css';
import {useEffect, useMemo, useState} from "react";
import MyInput from "./components/UI/input/MyInput";
import TasksList from "./components/TasksList";
import axios from "axios"
import React from "react";

function App() {

    const [tasks, setTasks] = useState([]);


    const [popup, setPopup] = useState({
        overlay: 'overlay_off',
        editWindow: 'editWindow_off'
    })

    const [tempTaskName, setTempTaskName] = useState('')

    const [tempId, setTempId] = useState('')



    // Getting tasks from MongoDB database
    const getDataFromDb = () => {
        axios.get("/get_tasks")
            .then(res => {
                setTasks(res.data)
            }).catch((error) => {
            console.log(error)
        })
    }
    useEffect(() => {
        getDataFromDb()
    }, [])

    const createTask = newTaskName => {
        const newTask = {
            name: newTaskName,
            completed: false,
            id: Date.now()
        }
        const pureContent = newTaskName.replace(/\s+/g, '') //check if task is an empty string
        if (pureContent !== '') {
            axios.post('/create_task', newTask)
                .then(() => {
                    getDataFromDb()
                    console.log(`Created: ${newTask.name}`)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    };

    const deleteTask = task => {
        axios.delete(`/delete_task/${task._id}`)
            .then(() => {
                console.log(`Deleted: ${task.name}`)
                getDataFromDb()
            })
            .catch(err => console.log(err))
    }


    const changeTaskName = (task, id) => {
        setTempTaskName(task)
        setTempId(id)
        setPopup({
            overlay: 'overlay_on',
            editWindow: 'editWindow_on'
        })
    }

    const changeTaskNameInDb = event =>{
        const data = {
            name: tempTaskName
        }
        event.preventDefault()
        console.log(tempTaskName)
        axios.patch(`/update_task_name/${tempId}`, data)
            .then(() => {
                console.log(`Name changed: to ${tempTaskName}`)
                getDataFromDb()
            })
            .catch(err => console.log(err))

        setPopup({
            overlay: 'overlay_off',
            editWindow: 'editWindow_off'
        })
    }

    const changeTaskState = task => {

        axios.patch(`/update_task_state/${task._id}`, task)
            .then(() => {
                console.log(`State modified: ${task.name} --> ${task.completed}`)
                getDataFromDb()
            })
            .catch(err => console.log(err))
    }


    return (
        <div className="App">

            <h1>Your tasks for today:</h1>

            <MyInput create={createTask} setTasks={setTasks}/>

            <h2>Active tasks ({tasks.length})</h2>

            <TasksList tasks={tasks}
                       deleteTask={deleteTask}
                       changeTaskState={changeTaskState}
                       changeTaskName={changeTaskName}
                       tasksFilter="active"
            />

            <h2>Completed tasks ({tasks.length})</h2>

            <TasksList tasks={tasks}
                       deleteTask={deleteTask}
                       changeTaskState={changeTaskState}
                       changeTaskName={changeTaskName}
                       tasksFilter='completed'
            />

            <div className={popup.overlay}></div>
            <form action="" className={popup.editWindow}>
                <input value={tempTaskName} onChange={event=>setTempTaskName(event.target.value)}></input>
                <button type="submit" onClick={changeTaskNameInDb}>Save</button>
            </form>

        </div>);
}

export default App;
