import React from 'react';
import '../App.css';
import Header from '../components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  );
}

export default App;
