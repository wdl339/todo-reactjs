import { useEffect, useState } from 'react';
import AddTaskArea from '../component/AddTaskArea';
import OneTask from '../component/OneTask';
import TaskDetail from '../component/TaskDetail';
import '../css/content.scss';
import { addTaskJson, getCanvasTask, getTasks } from '../service/content';
import { formatTime, getToday } from '../util/time';
// const moment = require('moment');

function Content({user_id}) {

    const [isOpen, setIsOpen] = useState(false)
    const [getTaskFinishing, setGetTaskFinishing] = useState(false)
    const [tasks, setTasks] = useState([])
    const [job,setJob] = useState({})
    const [savedScrollPosition, setSavedScrollPosition] = useState(0)
    const [date, setDate] = useState('')
    const [isfolded0, setIsFolded0] = useState(false)
    const [isfolded1, setIsFolded1] = useState(false)
    const [isfolded2, setIsFolded2] = useState(false)
    const [isfolded3, setIsFolded3] = useState(false)
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

        setDate(getToday()) ;
        
    },[user_id, getTaskFinishing, tasks])

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

    const onFold = (num) => {
        if (num === 0){
            return () => {
                setIsFolded0(!isfolded0)
            }
        } else if (num === 1){
            return () => {
                setIsFolded1(!isfolded1)
            }
        } else if (num === 2){
            return () => {
                setIsFolded2(!isfolded2)
            }
        } else if (num === 3){
            return () => {
                setIsFolded3(!isfolded3)
            }
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

    return( 
        (user_id !== "")?
            <div id="content" class='row'>
                <div class='col-s-0 col-lg-2'></div>
                <div id="form-todo" class='col-lg-8 col-s-12'>
                    <div class="row">
                        <div className='title col-12'>
                            <p>{date} 所有任务</p>
                        </div>
                        
                        <button className="btn-canvas" onClick={() => {getCanvas()}}>同步canvas任务</button>

                        <AddTaskArea setTasks={setTasks} user_id={user_id}/>

                        {/* no-complete-task-area */}
                        <div className='area col-s-12'>
                            <div class="row">
                                <div className='title col-12'>
                                    {isfolded0 ? <i className="bx bx-chevron-right arrow" onClick={onFold(0)}></i> 
                                        : <i className='bx bx-chevron-down arrow' onClick={onFold(0)}></i>}
                                    <span>未完成 </span>
                                    <span className='number-complete'>{tasks.length - numberOfComplete}</span>
                                </div>

                                {!isfolded0 &&
                                    <>
                                    <div className='title col-12'>
                                        {isfolded1 ? <i className="bx bx-chevron-right arrow" onClick={onFold(1)}></i> 
                                            : <i className='bx bx-chevron-down arrow' onClick={onFold(1)}></i>}
                                        <span>1个月内</span>
                                    </div>

                                    {!isfolded1 &&
                                        tasks.map((task,index) => {
                                            let isUrgent = new Date(task.deadLine) < oneMonthFromNow;

                                            if (task.isComplete === false && isUrgent === true) {
                                                return <OneTask task={task} index={index} clickOpen={clickOpen} setTasks={setTasks}/>
                                            } else{
                                                return <div></div>
                                            }
                                        })
                                    }

                                    <div className='title col-12'>
                                        {isfolded2 ? <i className="bx bx-chevron-right arrow" onClick={onFold(2)}></i> 
                                            : <i className='bx bx-chevron-down arrow' onClick={onFold(2)}></i>}
                                        <span>1个月后 </span>
                                    </div>

                                    {!isfolded2 &&
                                        tasks.map((task,index) => {
                                            let isUrgent = new Date(task.deadLine) < oneMonthFromNow;

                                            if (task.isComplete === false && isUrgent === false) {
                                                return <OneTask task={task} index={index} clickOpen={clickOpen}/>
                                            } else{
                                                return <div></div>
                                            }
                                        })
                                    }
                                    </>
                                }
                            </div>
                        </div>

                        {/* complete-task-area */}
                        <div className='area col-12'>
                            <div class="row">
                                <div className='title col-12'>
                                    {isfolded3 ? <i className="bx bx-chevron-right arrow" onClick={onFold(3)}></i> 
                                        : <i className='bx bx-chevron-down arrow' onClick={onFold(3)}></i>}
                                    <span>已完成 </span>
                                    <span className='number-complete'>{numberOfComplete}</span>
                                </div>

                                {!isfolded3 &&
                                    tasks.map((task,index) => {
                                        if (task.isComplete === true) {
                                                return <OneTask task={task} index={index} clickOpen={clickOpen}/>
                                            } else{
                                                return <div></div>
                                            }
                                        })
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <TaskDetail job={job} clickOpen={clickOpen}/>

                <div class='col-s-0 col-lg-2'></div>
            </div>
            :<p>请先登录</p>
    );
}

export default Content;
