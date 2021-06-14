import React, {useState, useEffect} from 'react';
import './ForecastTab.css';
import axios from 'axios';
import kelvinToCelcius from '../../helpers/kelvinToCelcius';
import createDateString from "../../helpers/createDateString";
const apiKey = 'dd1a0d338bf333f2c40690b52178ddf0';


function ForecastTab({coordinates}) {
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(false);
    const [loading,toggleLoading] = useState(false);

    useEffect(()=>{
        async function fetchData() {
            setError(false);
            toggleLoading(true);
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,hourly&appid=${apiKey}&lang=nl`);
                setForecast(result.data.daily.slice(1, 6));
                console.log(forecast)
            } catch (e) {
                console.error(e);
                setError(true);
            }
            toggleLoading(false);
        }
        if (coordinates !== null){
            fetchData()
        }
    },[coordinates])


  return (
    <div className="tab-wrapper">
        {loading && (<span>Loading...</span>)}
        {!forecast && !error && (
            <span className="no-forecast">
                Zoek eerst een locatie om het weer voor deze week te bekijken
            </span>
        )}
        {error && (
            <span>Er is iets misgegaan met het ophalen van de data</span>
        )}
        {forecast && forecast.map((forecast)=>{
            return (
                <article className="forecast-day" key={forecast.dt}>
                    <p className="day-description">
                        {createDateString(forecast.dt)}
                    </p>
                    <section className="forecast-weather"><span>{kelvinToCelcius(forecast.temp.day)}</span>
                        <span className="weather-description">{forecast.weather[0].description}</span>
                    </section>
                </article>
            )
        })}
    </div>
  );
};

export default ForecastTab;
