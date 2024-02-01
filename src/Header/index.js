import './header.scss';

function Header() {
    return ( 
        <div class="row">
            <div id="header" className='col-12'>
                <div className='col-4 title'>
                    <i className="fa-solid fa-bars"></i>
                    <p>To Do</p>
                </div>
                <div className='col-3 icons'>
                    <div className='icon'>
                        <i className="fa-sharp fa-solid fa-gear"></i>
                    </div>
                    <div className='user icon'>
                        <i className="fa-solid fa-user"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;