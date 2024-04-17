import React from 'react';
import { addNote } from '../service/note';

function AddNoteArea({setNotes, date,user_id}) {

    const addOneNote = async (event) => {
        event.preventDefault();
        console.log('addOneNote');

        const formData = new FormData(event.target);
        const newNote = {
            title: formData.get('title'),
            dateTime: date,
            detail: '',
            isImportant: false,
            user_id: user_id,
        }

        try {
            const response = await addNote(newNote);

            if (response.ok) {
                const data = await response.json();
                newNote._id = data.id;
                setNotes((prevNotes) => [...prevNotes, newNote]);
                document.getElementById('text-area').value = '';
            } else {
                console.error('记录添加失败');
            }

        } catch (error) {
            console.error('添加记录时发生错误', error);
        }
    }

  return (
    <form className='add-note-area col-12' onSubmit={addOneNote}>

        <button type='submit' class='btn btn-add' >添加</button>

        <div className='info col-lg-11'>
            <input type='text' name='title' class='text-area' placeholder='新记录...' id='text-area' required/>
        </div>

    </form>
  );
}

export default AddNoteArea;