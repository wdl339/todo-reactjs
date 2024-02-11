import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Content from './Content';
import Note from './Note';

function App() {

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
                <a class="nav-link header-title" aria-current="page" href="/task">任务</a>
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
            <Route path="/" element={<Content />} />
            <Route path="/task" element={<Content />} />
            <Route path="/note" element={<Note />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;