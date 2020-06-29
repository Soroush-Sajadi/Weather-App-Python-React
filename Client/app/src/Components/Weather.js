import React, { useState, useReducer } from 'react';
import LocationWeather from './LocationWeather'
import './Weather.css';

const Weather =() => {
  const [ weather, setWeather ] = useState([]);
  const [city, setCity] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
    city: '',
    }
  );

  const getInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setCity({[name]: newValue});
  }

  const sendInput = () => {
    fetchData(city.city)
  }
  
  const fetchData = async(city) => {
    await fetch ('http://127.0.0.1:5000/', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        "city": city,
      })
    })
      .then(res => res.json())
      .then(city =>(setWeather (JSON.parse(city))))
  }
  console.log(weather)
  return (
    <div className="wrap">
      <input className="input" type="text" name="city" value={city.city} placeholder="city" onChange={getInput} />
      <input className="button" type="submit" placeholder="submit" onClick={sendInput} />
      {weather.length === 0 ? <LocationWeather />:
      <>
      {weather.message !== 'city not found' ? 
      <div className="weather-info">
        <h2>{weather.name}</h2>
        <p>Temp:{weather.main.temp}</p>
        <p>Feels Like:{weather.main.feels_like}</p>
        <p>Max:{weather.main.temp_max}</p>
        <p>Min:{weather.main.temp_min}</p>
      </div>
      :
      <div className="not-found">
          <h2>{weather.message}</h2>
      </div>
        }
      </>
      }
    </div>
  );
}

export default Weather;
