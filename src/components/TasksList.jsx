import React from 'react';
import TaskItem from "./TaskItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const TasksList = ({tasks, deleteTask, changeTaskState, changeTaskName, tasksFilter}) => {

    let filter
    (tasksFilter=='active') ? filter=false : filter=true

    if (!tasks.length) {
        return (
            <h3 style={{textAlign: 'center'}}>There are no tasks</h3>
        )
    }

    return (
        <div>
            <TransitionGroup>
                {tasks.map(
                    task =>
                        <CSSTransition
                            key={task._id}
                            timeout={500}
                            classNames="task"
                        >{(task.completed==filter) ?
                            <TaskItem task={task} deleteTask={deleteTask}
                                      changeTaskState={changeTaskState} changeTaskName={changeTaskName} id={task._id}/> : <></>}
                        </CSSTransition>
                )
                }
            </TransitionGroup>
        </div>);
};

export default TasksList;
