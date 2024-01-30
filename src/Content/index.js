
import { useEffect, useState } from 'react';
import './content.scss';

function Content() {

    const [isOpen, setIsOpen] = useState(false)
    const [tasks, setTasks] = useState([])
    const [job,setJob] = useState({})
    const [isComplete, setIsComplete] = useState(false)
    const [isImportant, setIsImportant] = useState(false)

    useEffect (() => {
        fetch('https://todo-nodejs-nu.vercel.app/api/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))
    },[])

    const handleClickTask = (task) =>{
        const formToDo = document.querySelector('#form-todo')
        const formDetail = document.querySelector('.form-detail-task')
        if (isOpen === false){
            formToDo.style.width = '940px'
            formDetail.style.right = '0px'
            setJob(task)
            document.querySelector('.description').value = task.description
            document.querySelector('.task-name-detail').value = task.name
            setIsImportant(task.isImportant)
            setIsComplete(task.isComplete)
            setIsOpen(true)
        } else{
            formToDo.style.removeProperty('width')
            formDetail.style.right = '-700px'
            setJob(task)
            setIsOpen(false)
        }
    }

    return(
        <div id="content" className='col-lg-12'>
            {console.log(tasks)}
            <div id="form-todo" className='col-lg-11'>
                <div className='title col-lg-12'>
                    <i className='bx bx-sun sun'></i>
                    <p>My Day ({tasks.length})</p>
                </div>
                <div className='date col-lg-12'>
                    29 January, 2024
                </div>

                <form method='POST' action='https://todo-nodejs-nu.vercel.app/insert-task' className='add-task-area col-lg-12'>
                    {/* isComplete */}
                    <input type='hidden' name='isComplete' value={false} />
                    <input type='checkbox' className='check' />

                    {/* name */}
                    <input type='text' name='name' className='text-area col-lg-10' placeholder='Add a task' />
                    
                    {/* description */}
                    <input type='hidden' name='description' value='' />

                    {/* important */}
                    <input type='hidden' name='isImportant' value={true} />
                    
                    <button type='submit' className='btn-add'>Add</button>
                </form>

                 {/* no-complete-task-area */}
                <div className='area col-lg-12'>
                    {tasks.map((task,index) => {
                        if (task.isComplete === false) {
                            return <div key={index} onClick={() => handleClickTask(task)} className='task col-lg-12 mt-4'>
                                       <input type='checkbox' className='check' />
                                       <p className='task-name'>{task.name}</p>
                                       <i class="fa-solid fa-star star"></i>
                                    </div>
                        } else{
                            return <div></div>
                        }
                    })}
                </div>

                {/* complete-task-area */}
                <div className='area col-lg-12'>
                    <div className='title col-lg-12'>
                        <i className='bx bx-chevron-down arrow'></i> 
                        <span>Complete </span>
                        <span className='number-complete'>4</span>
                    </div>
                    {tasks.map((task,index) => {
                        if (task.isComplete === true) {
                            return <div key={index} onClick={() => handleClickTask(task)} className='task col-lg-12 mt-4'>
                                       <input type='checkbox' className='check' />
                                       <p className='task-name'>{task.name}</p>
                                       <i class="fa-solid fa-star star"></i>
                                    </div>
                        } else{
                            return <div></div>
                        }
                    })}
                </div>
            </div>

            <form method='POST' action='https://todo-nodejs-nu.vercel.app/update-task' className='form-detail-task col-lg-4'>
                <div className='title col-lg-10'>
                    {/* isComplete */}
                    <input type='hidden' className='isCompleteHidden' name='isComplete' value={isComplete} />
                    <input type='checkbox' checked={isComplete} onClick={() => {
                        if (isComplete === false) 
                            setIsComplete(true)
                        else 
                            setIsComplete(false)
                    }} className='check' />

                     {/* name */}
                    <input className='task-name-detail' name='name' />

                    {/* important */}
                    <input type='hidden' name='isImportant' value={isImportant} />

                    {isImportant === false ? 
                    <i class="fa-regular fa-star star" onClick={() => {
                        if (isImportant === false) 
                            setIsImportant(true)
                        else 
                            setIsImportant(false)  
                    }}></i> : 
                    <i class="fa-solid fa-star star" onClick={() => {
                        if (isImportant === false) 
                            setIsImportant(true)
                        else 
                            setIsImportant(false)  
                    }}></i>}
                </div>

                {/* description */}
                <textarea className='col-lg-10 description' name='description' />

                {/* dateTime */}
                <input type='hidden' name='dateTime' value={job.dateTime} />

                <div className='btns-area col-lg-10'>
                    <input type='hidden' value={job._id} name='_id'/>
                    <button type="submit" class="btn btn-primary" value={job._id}>Update</button>

                    <form method='POST' action='https://todo-nodejs-nu.vercel.app/delete-task'>
                        <input type='hidden' value={job._id} name='_id'/>
                        <button type="submit" class="btn btn-danger" value={job._id}>Delete</button>
                    </form>
                    
                </div>
                <i onClick={() => handleClickTask(job)} className="fa-solid fa-xmark exit"></i>
            </form>
        </div>
    );
}

export default Content;