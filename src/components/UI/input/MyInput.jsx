import React, {useState} from 'react';
import inputClasses from "./MyInput.module.css";
import MyButton from "../button/MyButton";

const MyInput = (props) => {
    const [task, setTask] = useState('')
    const taskMaxLength = 60

    const newTask = event => {
        event.preventDefault()
        props.create(task)
        setTask('')
    }

    return (
        <form action="">
            <input type='text' className={inputClasses.myInput}  value = {task} placeholder="Add new task here..." maxLength={taskMaxLength}
                   onChange={event => setTask(event.target.value)}/>
            <MyButton type='submit' onClick={newTask} className="myBtnInput" >Add</MyButton>
        </form>
    )
};

export default MyInput;
