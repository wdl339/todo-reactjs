import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Content from './Content';
import Login from './Login';
import Note from './Note';

function App() {
  const [userID,set_user_id] = useState("");
  const [isLoggedIn,setIsLoggedIn] = useState(false);

  useEffect(() => {

    const fetchData = async (token) => {
      const response = await fetch('https://todo-nodejs-nu.vercel.app/api/protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      })
  
      if (response.ok) {
        const data = await response.json();
        set_user_id(data.user_id);
        setIsLoggedIn(true);
        console.log(userID)
      } else {
        localStorage.removeItem('token');
        set_user_id("");
        setIsLoggedIn(false);
        console.log("设置user_id失败")
      }
  }

    const token = localStorage.getItem('token');
    if (token) {
      try {
        fetchData(token);
      } catch (error) {
        console.log('验证令牌时发生错误:', error);
      }
    }
  }, [isLoggedIn,userID]);

  useEffect (() => {

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1; 
    var day = today.getDate();
    var dateElement = document.querySelector(".date");
    dateElement.textContent = year + "-" + month + "-" + day;
    
  },[])

  return (
    <BrowserRouter>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid header">
          <a class="navbar-brand header-title" href="/task">To Do</a>
          <div className="date header-title"></div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fa-solid fa-bars header-title"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link header-title" href="/">登录</a>
              </li>
              <li class="nav-item">
                <a class="nav-link header-title" href="/task">任务</a>
              </li>
              <li class="nav-item">
                <a class="nav-link header-title" href="/note">记录</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="content-wrapper">
          <Routes>
            <Route exact path="/" element={<Login setIsLoggedIn = {setIsLoggedIn}/>} />
            <Route path="/task" element={<Content user_id ={userID}/>} />
            <Route path="/note" element={<Note user_id ={userID}/>} /> 
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;