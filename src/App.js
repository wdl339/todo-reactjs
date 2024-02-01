import './App.css';
import Content from './Content';
import Header from './Header';

function App() {
    return (
      <div class="container-fluid">
        <div class="App row" >
          <div class="col-12">
           <Header />
          </div>
          <div class="content-wrapper col-12">
           <Content />
          </div>
        </div>
      </div>
    );
}

export default App;
