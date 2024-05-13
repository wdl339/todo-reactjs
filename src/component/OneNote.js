import React from 'react';
import { updateNoteImportant } from '../service/note';

function OneNote({setNotes, note, index, clickOpen, changeNoteFreshing}) {

  const importantSubmit = async (event) => {
    event.preventDefault();
    console.log('importantSubmit');

    const data = {
        _id: note._id,
        isImportant: !note.isImportant
    }

    try {
        const response = await updateNoteImportant(data);

        if (response.ok) {
            setNotes((prevNotes) => {
                const newNotes = [...prevNotes];
                newNotes[index].isImportant = !note.isImportant;
                return newNotes;
            });
            changeNoteFreshing();
        } else {
            console.error('任务更新失败');
        }

    } catch (error) {
        console.error('更新任务时发生错误', error);
    }
  }
  
  return (
    <div key={index} className={'note col-12 note' + index}>
                                                        
        <div className='info' onClick={() => {clickOpen(note)}}>
            <input type='text' className='note-title col-12' value={note.title} readOnly/>
        </div>

        <div id={'important'+index}>
                {note.isImportant === false ? <i class="fa-regular fa-star star" onClick={(event) => importantSubmit(event,index)}></i> 
                    : <i class="fa-solid fa-star star" onClick={(event) => importantSubmit(event,index)}></i>}
        </div>
    </div>
  );
}

export default OneNote;