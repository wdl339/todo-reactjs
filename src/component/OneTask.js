import React from 'react';
import ProgressBar from './ProgressBar';

function OneTask({task, index, clickOpen}){
    return (
        <div key={index} className={'task col-12 task' + index}>
            {/* complete */}
                <form id={'complete'+index} method='POST' action='https://todo-nodejs-nu.vercel.app/update-complete'>
                    <input type='hidden' value={task._id} name='_id'/>
                    <input type='hidden' value={!task.isComplete} name='isComplete'/>
                    <input type='checkbox' className='check'  checked={task.isComplete}
                        onChange={() => {document.getElementById('complete'+index).submit()}}/>
                </form>
                
            <div className='info' onClick={() => {clickOpen(task)}}>
                <input type='text' className='task-name col-11' value={task.name} readOnly/>
                {task.isComplete ? null: <ProgressBar deadline={task.deadLine} dateTime={task.dateTime} />}
            </div>
            

            {/*important */}
            
            <form id={'important'+index} method='POST' action='https://todo-nodejs-nu.vercel.app/update-important'>
                    {task.isImportant === false ? <i class="fa-regular fa-star star" onClick={() => {document.getElementById('important'+index).submit()}}></i> 
                        : <i class="fa-solid fa-star star" onClick={() => {document.getElementById('important'+index).submit()}}></i>}
                    <input type='hidden' value={task._id} name='_id'/>
                    <input type='hidden' value={!task.isImportant} name='isImportant'/>
            </form>
        </div>
    );
}

export default OneTask;