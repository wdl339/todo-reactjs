import React from 'react';
import '../css/content.scss';
import { BACKENDURL } from '../service/common';

function TaskDetail({job, clickOpen}) {
  const updateUrl = `${BACKENDURL}/update-task`;
  const deleteUrl = `${BACKENDURL}/delete-task`;

  return (
    <form method='POST' action={updateUrl} className='form-detail-task col-12'>
                        
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

            <form method='POST' action={deleteUrl}>    
                <input type='hidden' value={job._id} name='_id'/>
                <button type="submit" class="btn btn-danger" value={job._id}>删除</button>
            </form>

            <button type="button" class="btn btn-secondary" onClick={() => clickOpen(job)}>返回</button>
            
        </div>
    </form>
  );
}

export default TaskDetail;