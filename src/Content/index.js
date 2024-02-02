import { useEffect, useState } from 'react';
import './content.scss';
const moment = require('moment');

function Content() {

    const [isOpen, setIsOpen] = useState(false)
    const [tasks, setTasks] = useState([])
    const [job,setJob] = useState({})
    let numberOfComplete = 0

    useEffect (() => {

        fetch('https://todo-nodejs-nu.vercel.app/api/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))

        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1; 
        var day = today.getDate();
        var dateElement = document.querySelector(".date");
        dateElement.textContent = year + "-" + month + "-" + day;
        
    },[])
    tasks.forEach(task => {
        if (task.isComplete === true) {
            numberOfComplete++
        }
    })

    const changeTimetoStr = (time) =>{
        var ddlUtc = new Date(time);
        var year = ddlUtc.getFullYear();
        var month = (ddlUtc.getUTCMonth() + 1).toString().padStart(2, '0');
        var date = ddlUtc.getUTCDate().toString().padStart(2, '0');
        var hour = ddlUtc.getUTCHours().toString().padStart(2, '0');
        var minute = ddlUtc.getUTCMinutes().toString().padStart(2, '0');
        var ddlValue = year + '-' + month + '-' + date + 'T' + hour + ':' + minute;
        return ddlValue
    }

    const clickOpen = (task) =>{
        const formDetail = document.querySelector('.form-detail-task')
        if (isOpen === false){
            formDetail.style.right = '0px'
            setJob(task)
            document.querySelector('.description').value = task.description
            document.querySelector('.task-name-detail').value = task.name
            document.querySelector('.ddl').value = changeTimetoStr(task.deadLine);
            setIsOpen(true)
        } else{
            formDetail.style.right = '-2000px'
            setJob(task)
            setIsOpen(false)
        }
        
    }

    const ProgressBar = ({ deadline, dateTime }) => {
        if (deadline){
            const deadlineDate = moment(deadline).subtract(8, 'hours');
            const dateTimeDate = moment(dateTime).subtract(8, 'hours');
            const currentDate = moment();
            const timeDiff = deadlineDate - currentDate;
            const totalDiff = deadlineDate - dateTimeDate;
            const progress = Math.floor((timeDiff / totalDiff) * 100);
            console.log(deadlineDate)
            console.log(dateTimeDate)
            console.log(currentDate)
            console.log(progress)
        
            if (progress > 50 && progress <= 100) {
            return (
                <div className="progress col-12">
                    <div className="progress-bar" role="progressbar" style={{ width: `${progress}%`}} aria-valuemin="0" aria-valuemax="100">
                        {changeTimetoStr(moment(deadline))}
                    </div>
                </div>
            );
            } else if(progress > 0 && progress <= 50){
                return (
                    <div className="progress col-12">
                        <div className="progress-bar" role="progressbar" style={{ width: `${progress}%`}} aria-valuemin="0" aria-valuemax="100">
                        </div>
                        <p>{changeTimetoStr(moment(deadline))}</p>
                    </div>
                );
            } else {
                return null;
            }
        } else {
            return null;
            }
        
      };

    return(
            <div id="content" class='row col-12'>
                <div id="form-todo" class='col-11'>
                    <div class="row">
                        <div className='title col-12'>
                            <i className='bx bx-sun sun'></i>
                            <p>所有任务 ({tasks.length})</p>
                        </div>
                        
                        <div className="date col-12"></div>

                        <form method='POST' action='https://todo-nodejs-nu.vercel.app/insert-task' className='add-task-area col-12'>

                            <button type='submit' class='btn btn-add' >添加</button>

                            {/* name */}
                            <div className='info col-lg-11'>
                                <input type='text' name='name' class='text-area' placeholder='新任务...' />
                                <input type="datetime-local" class='ddl-area' name='deadLine'></input>
                            </div>

                            {/* isComplete */}
                            <input type='hidden' name='isComplete' value={false} />
                                            
                            {/* description */}
                            <input type='hidden' name='description' value='' />

                            {/* isImportant */}
                            <input type='hidden' name='isImportant' value={false} />

                        </form>

                        {/* no-complete-task-area */}
                        <div className='area col-12'>
                            <div class="row">
                                <div className='title col-12'>
                                    <i className='bx bx-chevron-down arrow'></i> 
                                    <span>未完成 </span>
                                    <span className='number-complete'>{tasks.length - numberOfComplete}</span>
                                </div>

                                {tasks.map((task,index) => {
                                    if (task.isComplete === false) {
                                        return <div key={index} onClick={(e) => {
                                            if(e.target.className !== 'check' && e.target.className !== 'star'){
                                                clickOpen(task)
                                            }
                                        }} className={'task col-12 task' + index}>
                                                {/* complete */}
                                                    <form id={'complete'+index} method='POST' action='https://todo-nodejs-nu.vercel.app/update-complete'>
                                                        <input type='hidden' value={task._id} name='_id'/>
                                                        <input type='hidden' value={!task.isComplete} name='isComplete'/>
                                                        <input type='checkbox' className='check'  checked={task.isComplete}
                                                            onChange={() => {document.getElementById('complete'+index).submit()}}/>
                                                    </form>
                                                    
                                                <div className='info'>
                                                    <input type='text' className='task-name col-11' value={task.name} />
                                                    <ProgressBar deadline={task.deadLine} dateTime={task.dateTime} />
                                                </div>
                                                

                                                {/*important */}
                                                
                                                <form id={'important'+index} method='POST' action='https://todo-nodejs-nu.vercel.app/update-important'>
                                                        {task.isImportant === false ? <i class="fa-regular fa-star star" onClick={() => {document.getElementById('important'+index).submit()}}></i> 
                                                            : <i class="fa-solid fa-star star" onClick={() => {document.getElementById('important'+index).submit()}}></i>}
                                                        <input type='hidden' value={task._id} name='_id'/>
                                                        <input type='hidden' value={!task.isImportant} name='isImportant'/>
                                                </form>
                                                </div>
                                    } else{
                                        return <div></div>
                                    }
                                })}
                            </div>
                        </div>

                        {/* complete-task-area */}
                        <div className='area col-12'>
                            <div class="row">
                                <div className='title col-12'>
                                    <i className='bx bx-chevron-down arrow'></i> 
                                    <span>已完成 </span>
                                    <span className='number-complete'>{numberOfComplete}</span>
                                </div>

                                {tasks.map((task,index) => {
                                    if (task.isComplete === true) {
                                        return <div key={index} onClick={(e) => {
                                            if(e.target.className !== 'check' && e.target.className !== 'star'){
                                                clickOpen(task)
                                            }
                                        }} className={'task col-12 task' + index}>

                                                {/* complete */}
                                                <form id={'complete'+index} method='POST' action='https://todo-nodejs-nu.vercel.app/update-complete'>
                                                        <input type='hidden' value={task._id} name='_id'/>
                                                        <input type='hidden' value={!task.isComplete} name='isComplete'/>
                                                        <input type='checkbox' className='check'  checked={task.isComplete} 
                                                            onChange={() => {document.getElementById('complete'+index).submit()}}/>
                                                    </form>

                                                <div className='info'>
                                                    <input type='text' className='task-name col-11' value={task.name} />
                                                </div>
                                                
                                                {/*important */}
                                                <form id={'important'+index} method='POST' action='https://todo-nodejs-nu.vercel.app/update-important'>
                                                        {task.isImportant === false ? <i class="fa-regular fa-star star" onClick={() => {document.getElementById('important'+index).submit()}}></i> 
                                                            : <i class="fa-solid fa-star star" onClick={() => {document.getElementById('important'+index).submit()}}></i>}
                                                        <input type='hidden' value={task._id} name='_id'/>
                                                        <input type='hidden' value={!task.isImportant} name='isImportant'/>
                                                    </form>
                                                </div>
                                        } else{
                                            return <div></div>
                                        }
                                    })}
                            </div>
                        </div>
                    </div>
                </div>

                <form method='POST' action='https://todo-nodejs-nu.vercel.app/update-task' className='form-detail-task col-9'>

                    {/* isImportant */}
                    <input type='hidden' name='isImportant' value={job.isImportant} />

                    {/* isComplete */}
                    <input type='hidden' name='isComplete' value={job.isComplete} />
                    
                    {/* name */}
                    <textarea className='task-name-detail col-10' name='name' />

                    {/* deadLine */}
                    <div className="ddl-area col-10">
                        <i class="fa-solid fa-clock clock"></i> 
                        <input type="datetime" className='ddl' name='deadLine'></input>
                    </div>

                    {/* description */}
                    <textarea className='description col-10' name='description' />

                    {/* dateTime */}
                    <input type='hidden' name='dateTime' value={job.dateTime} />

                    <div className='btns-area col-10'>
                        <input type='hidden' value={job._id} name='_id'/>
                        <button type="submit" class="btn btn-primary" value={job._id}>保存</button>

                        <form method='POST' action='https://todo-nodejs-nu.vercel.app/delete-task'>
                            <input type='hidden' value={job._id} name='_id'/>
                            <button type="submit" class="btn btn-danger" value={job._id}>删除</button>
                        </form>

                        <button type="button" class="btn btn-secondary" onClick={() => clickOpen(job)}>返回</button>
                        
                    </div>
                </form>

            </div>
    );
}

export default Content;
