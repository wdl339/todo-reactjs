import React from 'react';
import '../css/content.scss';
import { updateComplete, updateImportant } from '../service/content';
import ProgressBar from './ProgressBar';

function OneTask({task, index, clickOpen, setTasks}) {

    const completeSubmit = async (event,index) => {
        event.preventDefault();

        const data = {
            _id: task._id,
            isComplete: !task.isComplete
        }

        try {
            const response = await updateComplete(data);
            console.log(response);

            if (response.ok) {
                console.log('completeSubmit');
                setTasks((prevTasks) => {
                    const newTasks = [...prevTasks];
                    newTasks[index].isComplete = !task.isComplete;
                    return newTasks;
                });
            } else {
                console.error('任务更新失败');
            }

        } catch (error) {
            console.error('更新任务时发生错误', error);
        }
    }

    const importantSubmit = async (event,index) => {
        event.preventDefault();

        const data = {
            _id: task._id,
            isImportant: !task.isImportant
        }

        try {
            const response = await updateImportant(data);

            if (response.ok) {
                console.log('importantSubmit');
                setTasks((prevTasks) => {
                    const newTasks = [...prevTasks];
                    newTasks[index].isImportant = !task.isImportant;
                    return newTasks;
                });
            } else {
                console.error('任务更新失败');
            }

        } catch (error) {
            console.error('更新任务时发生错误', error);
        }
    }

    return (
        <div key={index} className={'task col-12 task' + index}>
            {/* complete */}
                <div id={'complete'+index}>
                    <input type='checkbox' className='check'  checked={task.isComplete}
                        onChange={(event) => completeSubmit(event,index)}/>
                </div>
                
            <div className='info' onClick={() => {clickOpen(task)}}>
                <input type='text' className='task-name col-11' value={task.name} readOnly/>
                {task.isComplete ? null: <ProgressBar deadline={task.deadLine} dateTime={task.dateTime} />}
            </div>

            {/*important */}
            
            <div id={'important'+index}>
                {task.isImportant === false ? <i class="fa-regular fa-star star" onClick={(event) => importantSubmit(event,index)}></i> 
                    : <i class="fa-solid fa-star star" onClick={(event) => importantSubmit(event,index)}></i>}
            </div>
        </div>
    );
}

export default OneTask;