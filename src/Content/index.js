import { useEffect, useState } from 'react';
import './content.scss';
const moment = require('moment');

function Content({user_id}) {

    const [isOpen, setIsOpen] = useState(false)
    const [taskFinishing, setTaskFinishing] = useState(false)
    const [tasks, setTasks] = useState([])
    const [job,setJob] = useState({})
    let numberOfComplete = 0

    // test4
    // test3


    useEffect (() => {

        const url = `https://todo-nodejs-nu.vercel.app/api/tasks?user_id=${user_id}`
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                data.sort((a, b) => {
                    return new Date(a.deadLine) - new Date(b.deadLine);
                  });
                setTasks(data);
            })
        
    },[user_id,taskFinishing])

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
            if (task.deadLine) {
                document.querySelector('.ddl').value = changeTimetoStr(task.deadLine);
            } else {
                document.querySelector('.ddl').value = null;
            }
            setIsOpen(true)
        } else{
            formDetail.style.right = '-2000px'
            setJob(task)
            setIsOpen(false)
        }
        
    }

    const getCanvas = () => {
        const url = `https://todo-nodejs-nu.vercel.app/api/eventlist?user_id=${user_id}`
        fetch(url)
        .then(res => res.json())
        .then(data => {
            data.forEach(task => {
                const isUnique = tasks.every(existingTask => existingTask.name !== task.name);
                if (isUnique){
                    task.user_id = user_id;
                    fetch('https://todo-nodejs-nu.vercel.app/insert-task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                })
                }
            });
        }).then(() => {window.alert('同步成功'); setTaskFinishing(!taskFinishing)})
    }

    const ProgressBar = ({ deadline, dateTime }) => {
        if (deadline){
            const deadlineDate = moment(deadline).subtract(8, 'hours');
            const dateTimeDate = moment(dateTime).subtract(8, 'hours');
            const currentDate = moment();
            const timeDiff = deadlineDate - currentDate;
            const totalDiff = deadlineDate - dateTimeDate;
            const progress = Math.floor((timeDiff / totalDiff) * 100);
        
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

    //   const Task = new Schema ({
    //     name : {type : String},
    //     description : {type : String},
    //     isComplete : {type : Boolean},
    //     isImportant : {type : Boolean},
    //     dateTime : {type : Date},
    //     deadLine : {type : Date},
        // user_id : {type : Object}
    // })

    const addTask = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        const currentTime = new Date();
        const chinaTimestamp = currentTime.getTime() - currentTime.getTimezoneOffset() * 60 * 1000;
    
        var newTask = {
          name: formData.get('name'),
          dateTime: chinaTimestamp,
          deadLine: formData.get('deadLine'),
          isComplete: false,
          description: '',
          isImportant: false,
          user_id: user_id,
        };
    
        try {
          const response = await fetch('https://todo-nodejs-nu.vercel.app/insert-task', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
          });
    
          if (response.ok) {
            const data = await response.json();
            newTask._id = data.id;
            newTask.deadLine = moment(newTask.deadLine).add(8, 'hours');
            setTasks((prevTasks) => [...prevTasks, newTask]);
          } else {
            console.error('任务添加失败');
          }
        } catch (error) {
          console.error('添加任务发生错误', error);
        }
      };

    return( 
        (user_id !== "")?
            <div id="content" class='row'>
                <div id="form-todo" class='col-11'>
                    <div class="row">
                        <div className='title col-12'>
                            <i className='bx bx-sun sun'></i>
                            <p>所有任务 ({tasks.length})</p>
                        </div>
                        
                        <button className="btn-canvas" onClick={() => {getCanvas()}}>同步canvas任务</button>

                        <form class="add-task-area" onSubmit={addTask}>
                            <button type='submit' class='btn btn-add' >添加</button>

                            {/* name */}
                            <div className='info col-lg-11'>
                                <input type='text' name='name' class='text-area' placeholder='新任务...' />
                                <input type="datetime-local" class='ddl-area' name='deadLine'></input>
                            </div>

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
                                        return <div key={index} className={'task col-12 task' + index}>
                                                {/* complete */}
                                                    <form id={'complete'+index} method='POST' action='https://todo-nodejs-nu.vercel.app/update-complete'>
                                                        <input type='hidden' value={task._id} name='_id'/>
                                                        <input type='hidden' value={!task.isComplete} name='isComplete'/>
                                                        <input type='checkbox' className='check'  checked={task.isComplete}
                                                            onChange={() => {document.getElementById('complete'+index).submit()}}/>
                                                    </form>
                                                    
                                                <div className='info' onClick={() => {clickOpen(task)}}>
                                                    <input type='text' className='task-name col-11' value={task.name} readOnly/>
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
                                        return <div key={index} className={'task col-12 task' + index}>

                                                {/* complete */}
                                                <form id={'complete'+index} method='POST' action='https://todo-nodejs-nu.vercel.app/update-complete'>
                                                        <input type='hidden' value={task._id} name='_id'/>
                                                        <input type='hidden' value={!task.isComplete} name='isComplete'/>
                                                        <input type='checkbox' className='check'  checked={task.isComplete} 
                                                            onChange={() => {document.getElementById('complete'+index).submit()}}/>
                                                    </form>

                                                <div className='info' onClick={() => {clickOpen(task)}}>
                                                    <input type='text' className='task-name col-11' value={task.name} readOnly/>
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

                <form method='POST' action='https://todo-nodejs-nu.vercel.app/update-task' className='form-detail-task col-12'>
                    
                    {/* name */}
                    <textarea className='task-name-detail col-10' name='name' />

                    {/* deadLine */}
                    <div className="ddl-area col-10">
                        <i class="fa-solid fa-clock clock"></i> 
                        <input type="datetime" className='ddl' name='deadLine'></input>
                    </div>

                    {/* description */}
                    <textarea className='description col-10' name='description' />

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
            :<p>请先登录</p>
    );
}

export default Content;
