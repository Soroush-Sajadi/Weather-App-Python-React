import React, { useState, useEffect, useReducer } from 'react';
import Weather from './components/Weather'
import LocationWeather from './components/LocationWeather'
import './App.css';

function App() {
  
  return (
    <div className="App">
      <Weather />
    </div>
  );
}

export default App;
