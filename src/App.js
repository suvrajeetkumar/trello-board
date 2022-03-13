import logo from './logo.svg';
import './App.css';
import Cards from './components/Cards';
import React, { useState } from 'react';
function App() {
  
  

  
  return (
    <div className="App"> 
    <h1>Trello Board</h1>
    <div className='container'>
      
    <Cards />

    </div>

    </div>
  );
}

export default App;
