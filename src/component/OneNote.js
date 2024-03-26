
function OneNote({note, index, clickOpen}) {
  return (
    <div key={index} className={'note col-12 note' + index}>
                                                        
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
  );
}

export default OneNote;