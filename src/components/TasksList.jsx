import React from 'react';
import TaskItem from "./TaskItem";

const TasksList = ({tasks, deleteTask, changeTaskState, changeTaskName}) => {
    return (<div>
            {tasks.map(
                task =><TaskItem task={task} key={task.id} deleteTask={deleteTask} changeTaskState={changeTaskState} changeTaskName = {changeTaskName} />
                        )
            }
        </div>);
};

export default TasksList;
