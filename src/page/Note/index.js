import { useEffect, useState } from 'react';
import './note.scss';
// const moment = require('moment');
import { addNoteJson, getJwcNote, getNotes } from '../../service/note';
import { formatTimeForNote } from '../../util/time';

function Note({user_id}) {

    const [isOpen, setIsOpen] = useState(false)
    const [notes, setNotes] = useState([])
    const [job, setJob] = useState({})
    const [date, setDate] = useState('')
    const [getTaskFinishing, setGetTaskFinishing] = useState(false)
    let numberOfImportant = 0

    useEffect (() => {

        getNotes(user_id).then(data => {
            data.sort((a, b) => {
                return new Date(b.dateTime) - new Date(a.dateTime);
              });
            setNotes(data);
        })
        
    },[user_id,getTaskFinishing])

    useEffect (() => {

        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1; 
        var day = today.getDate();
        setDate(year + "-" + month + "-" + day)
        
      },[])
    notes.forEach(note => {
        if (note.isImportant === true) {
            numberOfImportant++
        }
    })

    const clickOpen = (note) =>{
        const formDetail = document.querySelector('.form-detail-note')
        if (isOpen === false){
            formDetail.style.right = '0px'
            setJob(note)
            document.querySelector('.detail').value = note.detail
            document.querySelector('.note-title-detail').value = note.title
            if (note.dateTime) {
                document.querySelector('.ddl').value = formatTimeForNote(note.dateTime);
            } else {
                document.querySelector('.ddl').value = null;
            }
            setIsOpen(true)
        } else{
            formDetail.style.right = '-2000px'
            setJob(note)
            setIsOpen(false)
        }
        
    }

    const getJwc = () => {
        getJwcNote().then(data => {
            data.forEach(note => {
                const isUnique = notes.every(existingNote => existingNote.title !== note.title);
                if (isUnique){
                    note.user_id = user_id;
                    addNoteJson(note);
                }
            });
        }).then(() => {window.alert('同步成功'); setGetTaskFinishing(!getTaskFinishing)})
        
    }

    // const Note = new Schema ({
    //     title : {type : String},
    //     detail : {type : String},
    //     link : {type : String},
    //     isImportant : {type : Boolean},
    //     dateTime : {type : Date},
    //     user_id : {type : Object}
    // })
    
    return( (user_id !== "")?
            <div id="content" class='row'>
                <div id="form-todo" class='col-11'>
                    <div class="row">
                        <div className='title col-12'>
                            <i className='bx bx-sun sun'></i>
                            <p>所有记录 ({notes.length})</p>
                        </div>
                        
                        <button className="btn-jwc" onClick={() => {getJwc()}}>同步教务处通知</button>

                        <form method='POST' action='https://todo-nodejs-nu.vercel.app/insert-note' className='add-note-area col-12'>

                            <button type='submit' class='btn btn-add' >添加</button>

                            {/* title */}
                            <div className='info col-lg-11'>
                                <input type='text' name='title' class='text-area' placeholder='新记录...' />
                            </div>

                            {/* dateTime */}
                            <input type="hidden" name='dateTime' value={date}/>
                                            
                            {/* detail */}
                            <input type='hidden' name='detail' value='' />

                            {/* isImportant */}
                            <input type='hidden' name='isImportant' value={false} />

                            {/* user_id */}
                            <input type='hidden' name='user_id' value={user_id} />

                        </form>

                        {/* important-note-area */}
                        <div className='area col-12'>
                            <div class="row">
                                <div className='title col-12'>
                                    <i className='bx bx-chevron-down arrow'></i> 
                                    <span>精选 </span>
                                    <span className='number-important'>{numberOfImportant}</span>
                                </div>

                                {notes.map((note,index) => {
                                    if (note.isImportant === true) {
                                      
                                        return <div key={index}  className={'note col-12 note' + index}>
                                                    
                                                <div className='info' onClick={() => {clickOpen(note)}}>
                                                    <input type='text' className='note-title col-11' value={note.title} readOnly/>
                                                </div>

                                                {/*important */}
                                                
                                                <form id={'important'+index} method='POST' action='https://todo-nodejs-nu.vercel.app/update-important-note'>
                                                        {note.isImportant === false ? <i class="fa-regular fa-star star" onClick={() => {document.getElementById('important'+index).submit()}}></i> 
                                                            : <i class="fa-solid fa-star star" onClick={() => {document.getElementById('important'+index).submit()}}></i>}
                                                        <input type='hidden' value={note._id} name='_id'/>
                                                        <input type='hidden' value={!note.isImportant} name='isImportant'/>
                                                </form>
                                                </div>
                                    } else{
                                        return <div></div>
                                    }
                                })}
                            </div>
                        </div>

                        {/* no-important-note-area */}
                        <div className='area col-12'>
                            <div class="row">
                                <div className='title col-12'>
                                    <i className='bx bx-chevron-down arrow'></i> 
                                    <span>未精选 </span>
                                    <span className='number-important'>{notes.length - numberOfImportant}</span>
                                </div>

                                {notes.map((note,index) => {
                                    if (note.isImportant === false) {
                                        return <div key={index} className={'note col-12 note' + index}>

                                                <div className='info' onClick={() => {clickOpen(note)}}>
                                                    <input type='text' className='note-title col-11' value={note.title} readOnly/>
                                                </div>
                                                
                                                {/*important */}
                                                <form id={'important'+index} method='POST' action='https://todo-nodejs-nu.vercel.app/update-important-note'>
                                                        {note.isImportant === false ? <i class="fa-regular fa-star star" onClick={() => {document.getElementById('important'+index).submit()}}></i> 
                                                            : <i class="fa-solid fa-star star" onClick={() => {document.getElementById('important'+index).submit()}}></i>}
                                                        <input type='hidden' value={note._id} name='_id'/>
                                                        <input type='hidden' value={!note.isImportant} name='isImportant'/>
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

                <form method='POST' action='https://todo-nodejs-nu.vercel.app/update-note' className='form-detail-note col-12'>
                    
                    {/* title */}
                    <textarea className='note-title-detail col-10' name='title' />

                    {/* dateTime */}
                    <div className="ddl-area col-10">
                        <i class="fa-solid fa-clock clock"></i> 
                        <input type="date" className='ddl' name='dateTime'></input>
                    </div>

                    {/* detail */}
                    <textarea className='detail col-10' name='detail' />

                    <div className='btns-area col-10'>
                        <input type='hidden' value={job._id} name='_id'/>
                        <button type="submit" class="btn btn-primary" value={job._id}>保存</button>

                        {job.link && (
                            <form method='POST' action='https://todo-nodejs-nu.vercel.app/update-detail'>
                                <input type='hidden' value={job._id} name='_id'/>
                                <input type='hidden' value={job.link} name='link'/>
                                <button type="submit" className="btn btn-primary" value={job._id}>更新</button>
                            </form>
                        )}

                        <form method='POST' action='https://todo-nodejs-nu.vercel.app/delete-note'>
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

export default Note;
