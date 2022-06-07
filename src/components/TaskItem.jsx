import React, {useState} from 'react';
import classes from "./TaskItem.module.css";
import MyButton from "./UI/button/MyButton";

const TaskItem = (props) => {

    const [a, setA] = useState(props.task.name)

    const changeName = task =>{
        setA(task)
    }

    return (
        <div>
            <div className={classes.task}>
                <input className={classes.taskContent} type="text" value={props.task.name} onChange={event => props.changeTaskName(props.task,event.target.value)}/>
                    {props.task.completed ?
                        <MyButton className="myBtnDone" onClick={() => props.changeTaskState(props.task)}>✓</MyButton>
                        :
                        <MyButton className="myBtnActive" onClick={() => props.changeTaskState(props.task)}></MyButton>
                    }
                    <MyButton onClick={() => props.deleteTask(props.task)} className="myBtnDelete">X</MyButton>
            </div>
        </div>
    );
};

export default TaskItem;
