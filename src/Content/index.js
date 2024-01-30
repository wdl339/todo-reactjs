
import { useState } from 'react';
import './content.scss';

function Content() {

    const [isOpen, setIsOpen] = useState(false)
    const handleClickTask = () =>{
        const formToDo = document.querySelector('#form-todo')
        const formDetail = document.querySelector('.form-detail-task')
        if (isOpen === false){
            formToDo.style.width = '940px'
            formDetail.style.right = '0px'
            setIsOpen(true)
        } else{
            formToDo.style.removeProperty('width')
            formDetail.style.right = '-700px'
            setIsOpen(false)
        }
    }

    return(
        <div id="content" className='col-lg-12'>
            <div id="form-todo" className='col-lg-11'>
                <div className='title col-lg-12'>
                    <i className='bx bx-sun sun'></i>
                    <p>My Day</p>
                </div>
                <div className='date col-lg-12'>
                    29 January, 2024
                </div>

                <div className='add-task-area col-lg-12'>
                    {/* isComplete */}
                    <input type='hidden' value={false} name='isComplete' />
                    <input type='checkbox' className='check' />

                    {/* name */}
                    <input type='text' name='name' className='text-area col-lg-10' placeholder='Add a task' />
                    
                    {/* description */}
                    <input type='hidden' name='description' value='' />

                    {/* important */}
                    <input type='hidden' name='isImportant' value={false} />
                    
                    <button type='submit' className='btn-add'>Add</button>
                </div>

                 {/* no-complete-task-area */}
                <div className='area col-lg-12'>
                    <div onClick={() => handleClickTask()} className='task col-lg-12 mt-4'>
                        <input type='checkbox' className='check' />
                        <p className='task-name'>Read book</p>
                        <i class="fa-solid fa-star star"></i>
                    </div>
                    
                </div>

                {/* complete-task-area */}
                <div className='area col-lg-12'>
                    <div className='title col-lg-12'>
                        <i className='bx bx-chevron-down arrow'></i> 
                        <span>Complete </span>
                        <span className='number-complete'>4</span>
                    </div>
                    <div onClick={() => handleClickTask()} className='task col-lg-12 mt-4'>
                        <input type='checkbox' className='check' />
                        <p className='task-name'>Read book</p>
                        <i class="fa-solid fa-star star"></i>
                    </div>
                    
                </div>
            </div>
            <div className='form-detail-task col-lg-4'>
                <div className='title col-lg-10'>
                    <input type='checkbox' className='check' />
                    <p className='task-name-detail'>Read book</p>
                    <i class="fa-solid fa-star star"></i>
                </div>
                <textarea className='col-lg-10 description' name='description' />
                <div className='btns-area col-lg-10'>
                    <button type="submit" class="btn btn-primary">Update</button>
                    <button type="submit" class="btn btn-danger">Delete</button>
                </div>
                <i onClick={() => handleClickTask()} className="fa-solid fa-xmark exit"></i>
            </div>
        </div>
    );
}

export default Content;