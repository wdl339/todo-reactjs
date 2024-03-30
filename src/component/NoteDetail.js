
function NoteDetail({job, clickOpen}) {
  return (
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
  );
}

export default NoteDetail;