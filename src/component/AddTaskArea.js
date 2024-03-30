import moment from 'moment';
import React from 'react';
import { addTask } from '../service/content';

function AddTaskArea({setTasks, user_id}) {

    const addOneTask = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

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

  return (
    <form class="add-task-area col-12" onSubmit={addOneTask}>
        <button type='submit' class='btn btn-add'>添加</button>

        <div className='info col-lg-11'>
            <input type='text' name='name' class='text-area' placeholder='新任务...' />
            <input type="datetime-local" class='ddl-area' name='deadLine'></input>
        </div>

    </form>
  );
}

export default AddTaskArea;