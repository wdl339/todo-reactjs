import { useEffect, useState } from 'react';
import OneTask from '../../component/OneTask';
import { addTask, addTaskJson, getCanvasTask, getTasks } from '../../service/content';
import { formatTime } from '../../util/time';
import './content.scss';
const moment = require('moment');

function Content({user_id}) {

    const [isOpen, setIsOpen] = useState(false)
    const [getTaskFinishing, setGetTaskFinishing] = useState(false)
    const [tasks, setTasks] = useState([])
    const [job,setJob] = useState({})
    const [savedScrollPosition, setSavedScrollPosition] = useState(0)
    let numberOfComplete = 0
    let oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

    useEffect (() => {

        getTasks(user_id).then(data => {
            data.sort((a, b) => {
                return new Date(a.deadLine) - new Date(b.deadLine);
              });
            setTasks(data);
        })
        
    },[user_id,getTaskFinishing])

    tasks.forEach(task => {
        if (task.isComplete === true) {
            numberOfComplete++
        }
    })

    const clickOpen = (task) =>{
        const formDetail = document.querySelector('.form-detail-task')
        if (isOpen === false){
            setSavedScrollPosition(window.scrollY);
            window.scrollTo(0, 0);
            formDetail.style.right = '0px'
            setJob(task)
            document.querySelector('.description').value = task.description
            document.querySelector('.task-name-detail').value = task.name
            if (task.deadLine) {
                document.querySelector('.ddl').value = formatTime(task.deadLine);
            } else {
                document.querySelector('.ddl').value = null;
            }
            setIsOpen(true)
        } else{
            window.scrollTo(0, savedScrollPosition);
            setSavedScrollPosition(0);
            formDetail.style.right = '-2000px'
            setJob(task)
            setIsOpen(false)
        } 
    }

    const getCanvas = () => {
        getCanvasTask(user_id).then(data => {
            data.forEach(task => {
                const isUnique = tasks.every(existingTask => existingTask.name !== task.name);
                if (isUnique){
                    task.user_id = user_id;
                    addTaskJson(task);
                }
            });
        }).then(() => {window.alert('同步成功'); setGetTaskFinishing(!getTaskFinishing)})
    }

    //   const Task = new Schema ({
    //     name : {type : String},
    //     description : {type : String},
    //     isComplete : {type : Boolean},
    //     isImportant : {type : Boolean},
    //     dateTime : {type : Date},
    //     deadLine : {type : Date},
        // user_id : {type : Object}
    // })

    const addOneTask = async (event) => {
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
          const response = await addTask(newTask);
    
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
                <div class='col-s-0 col-lg-2'></div>
                <div id="form-todo" class='col-s-12 col-lg-8'>
                    <div class="row">
                        <div className='title col-12'>
                            <i className='bx bx-sun sun'></i>
                            <p>所有任务 ({tasks.length})</p>
                        </div>
                        
                        <button className="btn-canvas" onClick={() => {getCanvas()}}>同步canvas任务</button>

                        <form class="add-task-area" onSubmit={addOneTask}>
                            <button type='submit' class='btn btn-add' >添加</button>

                            {/* name */}
                            <div className='info col-lg-11'>
                                <input type='text' name='name' class='text-area' placeholder='新任务...' />
                                <input type="datetime-local" class='ddl-area' name='deadLine'></input>
                            </div>

                        </form>

                        {/* no-complete-task-area */}
                        <div className='area col-s-12'>
                            <div class="row">
                                <div className='title col-12'>
                                    <i className='bx bx-chevron-down arrow'></i> 
                                    <span>未完成 </span>
                                    <span className='number-complete'>{tasks.length - numberOfComplete}</span>
                                </div>

                                {/* 计算从哪个Index任务开始，距离任务结束时间在1个月内 */}

                                <div className='title col-12'>
                                    <i className='bx bx-chevron-down arrow'></i>
                                    <span>1个月内</span>
                                </div>

                                {tasks.map((task,index) => {
                                    let isUrgent = new Date(task.deadLine) < oneMonthFromNow;

                                    if (task.isComplete === false && isUrgent === true) {
                                        return <OneTask task={task} index={index} clickOpen={clickOpen}/>
                                    } else{
                                        return <div></div>
                                    }
                                })}

                                <div className='title col-12'>
                                    <i className='bx bx-chevron-down arrow'></i>
                                    <span>非紧急 </span>
                                </div>

                                {tasks.map((task,index) => {
                                    let isUrgent = new Date(task.deadLine) < oneMonthFromNow;

                                    if (task.isComplete === false && isUrgent === false) {
                                        return <OneTask task={task} index={index} clickOpen={clickOpen}/>
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
                                            return <OneTask task={task} index={index} clickOpen={clickOpen}/>
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
                        <input type="datetime-local" className='ddl' name='deadLine'></input>
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

                <div class='col-s-0 col-lg-2'></div>
            </div>
            :<p>请先登录</p>
    );
}

export default Content;
