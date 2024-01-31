import './App.css';
import Content from './Content';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content-wrapper">
        <Content />
      </div>
    </div>
  );
}

export default App;
