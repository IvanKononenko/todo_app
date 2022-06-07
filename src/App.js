import './App.css';
import {useState} from "react";
import MyInput from "./components/UI/input/MyInput";
import TasksList from "./components/TasksList";
import MySelect from "./components/UI/select/MySelect";


function App() {
    const [activeTasks, setActiveTasks] = useState([
        {name: '1st test1', completed: false, id: 3},
        {name: '2nd test2', completed: false, id: 2},
        {name: '0nd test', completed: false, id: 1}
    ]);

    const [selectedSort, setSelectedSort] = useState('')

    const [completedTasks, setCompletedTasks] = useState([
        {name: '1st test3', completed: true, id: 3}
    ]);

      const createTask = newTask => {
        const pureContent = newTask.replace(/\s+/g, '') //check if task is an empty string
        if (pureContent !== '') {
            setActiveTasks([...activeTasks, {name: newTask, completed: false, id: Date.now()}])
        }
    };
    const deleteTask = task => {
        if (!task.completed) {
            setActiveTasks(activeTasks.filter(t => t.id !== task.id))
        } else {
            setCompletedTasks(completedTasks.filter(t => t.id !== task.id))
        }
    }

    const changeTaskName = (task, newName) => {
        //find task in the array
        const index = activeTasks.indexOf(task)
        console.log(index)
        //replace task with one with new name
        let temp_tasks = [...activeTasks]
        let temp_element = {...temp_tasks[index]}
        temp_element.name = newName
        console.log(newName)
        temp_tasks[index] = temp_element
        setActiveTasks(temp_tasks)
    }

    const changeTaskState = task => {
        if (!task.completed) {
            setActiveTasks(activeTasks.filter(t => t.id !== task.id))
            setCompletedTasks([...completedTasks, {name: task.name, completed: !task.completed, id: task.id}])
        } else {
            setCompletedTasks(completedTasks.filter(t => t.id !== task.id))
            setActiveTasks([...activeTasks, {name: task.name, completed: !task.completed, id: task.id}])
        }
    }

    const getSortedPosts = () =>{
        if (selectedSort==="name") {
            return  [...activeTasks].sort((a,b)=>a[selectedSort].localeCompare(b[selectedSort]))
        }
        if (selectedSort==="id"){
            return  [...activeTasks].sort((a,b)=>a-b)
        }
        return activeTasks
    }

    const activeSortedTasks = getSortedPosts()

    const sortTasks = (sort) => {
        setSelectedSort(sort)
    }

    return (
        <div className="App">
            <h1>Your tasks for today:</h1>
            <MyInput create={createTask} setTasks={setActiveTasks}/>
            <h2>Active tasks ({activeTasks.length})</h2>
            <MySelect
                value={selectedSort}
                onChange={sortTasks}
                defaultValue="sort by..."
                options={[
                    {value: "name", name: "sort by name"},
                    {value: "id", name: "sort by date"}
                ]}
            />
            <TasksList tasks={activeSortedTasks} deleteTask={deleteTask} changeTaskState={changeTaskState}
                       changeTaskName={changeTaskName}/>
            <h2>Completed tasks ({completedTasks.length})</h2>
            <TasksList tasks={completedTasks} deleteTask={deleteTask} changeTaskState={changeTaskState}/>
            {/*<Server/>*/}
        </div>);
}

export default App;
