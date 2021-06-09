import React, {useState, useEffect} from 'react';
import './ForecastTab.css';
import axios from 'axios';
const apiKey = 'dd1a0d338bf333f2c40690b52178ddf0';

function ForecastTab({coordinates}) {
    const [forecast, setForecast] = useState(null);

    useEffect(()=>{
        async function fetchData() {
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates?.lat}&lon=${coordinates?.lon}&exclude=minutely,current,hourly&appid=${apiKey}&lang=nl`);
                setForecast(result.data.daily.slice(1, 6));
                console.log(forecast)
            } catch (e) {
                console.error(e);
            }
        }
        if (coordinates){
            fetchData()
        }
    },[coordinates])

    function createDay(timestamp) {
        const day = new Date(timestamp * 1000);
        return day.toLocaleDateString('nl-NL', {weekday: 'long'});
    }

  return (
    <div className="tab-wrapper">
        {forecast && forecast.map((forecast)=>{
            return (
                <article className="forecast-day" key={forecast.dt}>
                    <p className="day-description">
                        {createDay(forecast.dt)}
                    </p>
                    <section className="forecast-weather"><span>{forecast.temp.day}</span>
                        <span className="weather-description">{forecast.weather[0].description}</span>
                    </section>
                </article>
            )
        })}
    </div>
  );
};

export default ForecastTab;
