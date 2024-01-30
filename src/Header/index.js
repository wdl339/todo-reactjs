import './header.scss';

function Header() {
    return ( 
        <div id="header" className='col-lg-12'>
            <div className='col-lg-2 title'>
                <i className="fa-solid fa-bars"></i>
                <p>To Do</p>
            </div>
            <div className='col-lg-3 icons'>
                <input class="form-control me-3" type="search" placeholder="Search" aria-label="Search"/>
                <div className='setting icon'>
                    <i className="fa-sharp fa-solid fa-gear"></i>
                </div>
                <div className='user icon'>
                    <i className="fa-solid fa-user"></i>
                </div>
            </div>
        </div>
    );
}

export default Header;