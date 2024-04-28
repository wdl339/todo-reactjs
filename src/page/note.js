import { useEffect, useState } from 'react';
import '../css/note.scss';
// const moment = require('moment');
import AddNoteArea from '../component/AddNoteArea';
import NoteDetail from '../component/NoteDetail';
import OneNote from '../component/OneNote';
import { addNoteJson, deleteNote, getJwcNote, getNotes } from '../service/note';
import { formatTimeForNote, getToday } from '../util/time';

function Note({user_id}) {

    const [isOpen, setIsOpen] = useState(false)
    const [notes, setNotes] = useState([])
    const [job, setJob] = useState({})
    const [date, setDate] = useState('')
    const [getTaskFinishing, setGetTaskFinishing] = useState(false)
    const [savedScrollPosition, setSavedScrollPosition] = useState(0)
    const [isfolded0, setIsfolded0] = useState(false)
    const [isfolded1, setIsfolded1] = useState(false)
    let numberOfImportant = 0

    useEffect(() => {
        getNotes(user_id).then(data => {
            if (data) {
                data.sort((a, b) => {
                    return new Date(b.dateTime) - new Date(a.dateTime);
                });
                setNotes(data);
            } else {
                setNotes([]);
            }
        })
    
        setDate(getToday());
        
    }, [user_id, getTaskFinishing, notes])

    notes.forEach(note => {
        if (note.isImportant === true) {
            numberOfImportant++
        }
    })

    const clickOpen = (note) =>{
        const formDetail = document.querySelector('.form-detail-note')
        if (isOpen === false){
            setSavedScrollPosition(window.scrollY);
            window.scrollTo(0, 0);
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
            window.scrollTo(0, savedScrollPosition);
            setSavedScrollPosition(0);
            formDetail.style.right = '-2000px'
            setJob(note)
            setIsOpen(false)
        }
    }

    const onFold = (index) => {
        if (index === 0) {
            return () => {
                if (isfolded0 === false) {
                    setIsfolded0(true)
                } else {
                    setIsfolded0(false)
                }
            }
        } else {
            return () => {
                if (isfolded1 === false) {
                    setIsfolded1(true)
                } else {
                    setIsfolded1(false)
                }
            }
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

    const deleteToTen = () => {
        let count = 0;
        let deleteNotes = [];
        notes.forEach(note => {
            if (note.isImportant === false) {
                count++;
                if (count > 10) {
                    deleteNote(note);
                    deleteNotes.push(note);
                }
            }
        })
        setNotes(notes.filter(note => !deleteNotes.includes(note)));
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
            <div id="note" class='row'>
                <div class='col-s-0 col-lg-2'></div>
                <div id="form-todo" class='col-lg-8 col-s-12'>
                    <div class="row">
                        <div className='title col-12'>
                            <p>{date} 所有记录</p>
                        </div>
                        
                        <button className="btn-jwc" onClick={() => {getJwc()}}>同步教务处通知</button>

                        <AddNoteArea setNotes={setNotes} date={date} user_id={user_id}/>

                        {/* important-note-area */}
                        <div className='area col-12'>
                            <div class="row">
                                <div className='title col-12'>
                                    {isfolded0 ? <i className="bx bx-chevron-right arrow" onClick={onFold(0)}></i> 
                                        : <i className='bx bx-chevron-down arrow' onClick={onFold(0)}></i>}
                                    <span>精选 </span>
                                    <span className='number-important'>{numberOfImportant}</span>
                                </div>

                                {!isfolded0 ? notes.map((note,index) => {
                                    if (note.isImportant === true) {
                                        return  <OneNote setNotes={setNotes} note={note} index={index} clickOpen={clickOpen}/>
                                    } else{
                                        return <div></div>
                                    }
                                }) : <div></div>}
                            </div>
                        </div>

                        {/* no-important-note-area */}
                        <div className='area col-12'>
                            <div class="row">
                                <div className='title col-12'>
                                    {isfolded1 ? <i className="bx bx-chevron-right arrow" onClick={onFold(1)}></i> 
                                        : <i className='bx bx-chevron-down arrow' onClick={onFold(1)}></i>}
                                    <span>未精选 </span>
                                    <span className='number-important'>{notes.length - numberOfImportant}</span>
                                </div>

                                {!isfolded1 ? notes.map((note,index) => {
                                    if (note.isImportant === false) {
                                            return <OneNote setNotes={setNotes} note={note} index={index} clickOpen={clickOpen}/>
                                        } else{
                                            return <div></div>
                                        }
                                    }) : <div></div>}
                            </div>
                        </div>

                        <button className="btn-jwc" onClick={() => {deleteToTen()}}>仅保留最近10条未精选记录</button>
                    </div>
                </div>

                <NoteDetail job={job} clickOpen={clickOpen}/>

                <div class='col-s-0 col-lg-2'></div>
            </div>
            :<p>请先登录</p>
    );
}

export default Note;
