import { useEffect, useState } from 'react';
import './content.scss';

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

    const clickOpen = (task) =>{
        const formDetail = document.querySelector('.form-detail-task')
        if (isOpen === false){
            formDetail.style.right = '0px'
            setJob(task)
            document.querySelector('.description').value = task.description
            document.querySelector('.task-name-detail').value = task.name
            setIsOpen(true)
        } else{
            formDetail.style.right = '-2000px'
            setJob(task)
            setIsOpen(false)
        }
        
    }

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
                                {/* isComplete */}
                                <input type='hidden' name='isComplete' value={false} />
                                <input type='checkbox' class="check" />

                                {/* name */}
                                <input type='text' name='name' class='text-area col-11' placeholder='Add a task' />
                                
                                {/* description */}
                                <input type='hidden' name='description' value='' />

                                {/* isImportant */}
                                <input type='hidden' name='isImportant' value={false} />
                                
                                <button type='submit' className='btn-add' >Add</button>
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
                                                    
                                                <input type='text' className='task-name col-11' value={task.name} />

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

                                                <input type='text' className='task-name col-11' value={task.name} />
                                                
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
                    
                    <div className='col-1 title'>
                        <i onClick={() => clickOpen(job)} className="fa-solid fa-xmark exit"></i>
                    </div>

                    {/* isImportant */}
                    <input type='hidden' name='isImportant' value={job.isImportant} />

                    {/* isComplete */}
                    <input type='hidden' name='isComplete' value={job.isComplete} />
                    
                    {/* name */}
                    <textarea className='task-name-detail col-10' name='name' />

                    {/* description */}
                    <textarea className='description col-10' name='description' />

                    {/* dateTime */}
                    <input type='hidden' name='dateTime' value={job.dateTime} />

                    <div className='btns-area col-10'>
                        <input type='hidden' value={job._id} name='_id'/>
                        <button type="submit" class="btn btn-primary" value={job._id}>更新</button>

                        <form method='POST' action='https://todo-nodejs-nu.vercel.app/delete-task'>
                            <input type='hidden' value={job._id} name='_id'/>
                            <button type="submit" class="btn btn-danger" value={job._id}>删除</button>
                        </form>
                        
                    </div>
                </form>

            </div>
    );
}

export default Content;
