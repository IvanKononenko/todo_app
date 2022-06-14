import './App.css';
import {useMemo, useState} from "react";
import MyInput from "./components/UI/input/MyInput";
import TasksList from "./components/TasksList";
import MySelect from "./components/UI/select/MySelect";


function App() {
    const [activeTasks, setActiveTasks] = useState([
        {name: '1st test1', completed: false, id: 3},
        {name: '2nd test2', completed: false, id: 2},
        {name: '0nd test', completed: false, id: 1}
    ]);

    const [selectedActiveSort, setActiveSelectedSort] = useState('')
    const [selectedCompletedSort, setCompletedSelectedSort] = useState('')

    const [searchQuery, setSearchQuery] = useState('')

    const [completedTasks, setCompletedTasks] = useState([
        {name: '1st test3', completed: true, id: 4}
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


    const sortTasks = (sort) => {
        setActiveSelectedSort(sort)
    }

    const getCompletedSortedPosts = () => {
        if (selectedCompletedSort === "name") {
            return [...completedTasks].sort((a, b) => a[selectedCompletedSort].localeCompare(b[selectedCompletedSort]))
        }
        if (selectedCompletedSort === "id") {
            return [...completedTasks].sort((a, b) => {
                return a > b ? -1 : b > a ? 1 : 0
            })
        }
        return completedTasks
    }

    const completedSortedTasks = getCompletedSortedPosts()

    const sortCompletedTasks = (sort) => {
        setCompletedSelectedSort(sort)
    }

    const sortedActiveTasks = useMemo(() => {
        if (selectedActiveSort === "name") {
            return [...activeTasks].sort((a, b) => a[selectedActiveSort].localeCompare(b[selectedActiveSort]))
        }
        if (selectedActiveSort === "id") {
            console.log('Sorted by id')
            return [...activeTasks].sort((a, b) => b - a)
        }
        return activeTasks
    }, [selectedActiveSort, activeTasks])

    const sortedAndSearchedActiveTasks = useMemo(() => {
        return sortedActiveTasks.filter(tasks => tasks.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, sortedActiveTasks])

    return (
        <div className="App">
            <h1>Your tasks for today:</h1>
            <MyInput create={createTask} setTasks={setActiveTasks}/>
            <h2>Active tasks ({activeTasks.length})</h2>
            <input
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                style={{marginRight: '10px'}}
                placeholder="search for..."
            />
            <MySelect
                value={selectedActiveSort}
                onChange={sortTasks}
                defaultValue="sort by..."
                options={[
                    {value: "name", name: "sort by name"},
                    {value: "id", name: "sort by date"}
                ]}
            />
            {sortedAndSearchedActiveTasks.length ?
                <TasksList tasks={sortedAndSearchedActiveTasks} deleteTask={deleteTask}
                           changeTaskState={changeTaskState}
                           changeTaskName={changeTaskName}/> :
                <h3 style={{textAlign: 'center'}}>No such tasks in the list!</h3>
            }
            <h2>Completed tasks ({completedTasks.length})</h2>
            <MySelect
                value={selectedCompletedSort}
                onChange={sortCompletedTasks}
                defaultValue="sort by..."
                options={[
                    {value: "name", name: "sort by name"},
                    {value: "id", name: "sort by date"}
                ]}
            />

            <TasksList tasks={completedSortedTasks} deleteTask={deleteTask} changeTaskState={changeTaskState}/>
        </div>);
}

export default App;
