import React, { useState, useEffect, useReducer } from 'react';
import './Weather.css';

const LocationWeather = () => {
  const [ localWeather, setLocalWeather ] = useState([]);
 

  const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
           getData(position.coords.latitude, position.coords.longitude)
    })
    }
  }
  const getData = async(lat, lon) => {
      await fetch(`http://127.0.0.1:5000/local/${lat}/${lon}`)
        .then(res => res.json())
        .then(res => setLocalWeather(res))
  }

  useEffect(() => {
      getLocation()
  } ,[])
  
  return (
    <div className="wrap">
      {localWeather.length === 0 ? null :
      <>
      {localWeather.message !== 'city not found' ? 
      <div className="weather-info">
        <h2>{localWeather.name}</h2>
        <p>Temp:{localWeather.main.temp}</p>
        <p>Feels Like:{localWeather.main.feels_like}</p>
        <p>Max:{localWeather.main.temp_max}</p>
        <p>Min:{localWeather.main.temp_min}</p>
      </div>
      :
      <div className="not-found">
          <h2>{localWeather.message}</h2>
      </div>
        }
        </>
    }
    </div>
  );
}

export default LocationWeather;
