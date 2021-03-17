import React, { useState, useEffect } from 'react';
import Countries from './components/countries';
const axios = require('axios')
const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    console.log(capital)
    const getWeather = () => {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
        .then((response) => setWeather(response.data))
        .catch(console.log)
    }
    getWeather()
  }, [capital])
  if (weather === null) {
    return (
      <div>
        Loading
      </div>
    )
  }

  return (
    <div>
      <h6> temperature: {weather.current.temperature} Celsius</h6>
      <img src={weather.current.weather_icons} alt={weather.current.weather_code} />
      <h6>wind: {weather.current.wind_speed} kph direction {weather.current.wind_dir}</h6>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newQuery, setNewQuery] = useState('')

  console.log(newQuery)
  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then((data) => {
        setCountries(data)
      })
      .catch(console.log)
  }, [])

  const setCountry = parts => (event) => {
    setNewQuery(parts.name)
  }

  const handleQuery = (event) => {
    setNewQuery(event.target.value)
  }

  function filterCountries(arr, query) {
    const result = arr.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    if (result.length === 1) {
      return (
        <div>
          <Countries countries={result} />
          {result.map((country) => (
            <Weather capital = {country.capital } />
          ))}
        </div>
      )
    }

    if (result.length < 10) {
      const resultList = result.map((country) => (
          <ShowButton key={country.name} name={country} setCountry={setCountry} />
      )
      )
      return resultList
    } else {
      return <p>too many matches, specify another filter</p>
    }
  }

  return (
          <div>
            <QueryForm newQuery={newQuery} handleQuery={handleQuery} />
            {filterCountries(countries, newQuery)}
          </div>
  )
}

const ShowButton = ({ name, setCountry}) => {
  return (
          <p>
            {name.name} <button onClick={setCountry(name)}>show</button>
          </p>
  )
}

const QueryForm = ({ newQuery, handleQuery}) => {
  return (
          <form>
            <div>
              find countries <input
                value={newQuery}
                onChange={handleQuery}
              />
            </div>
          </form>
  )
}

export default App;