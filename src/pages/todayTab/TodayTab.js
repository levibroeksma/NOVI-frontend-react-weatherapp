import React, {useEffect, useState} from 'react';
import './TodayTab.css';
import axios from "axios";

const apiKey = 'dd1a0d338bf333f2c40690b52178ddf0';

function TodayTab({coordinates}) {
	const [forecast, setForecast] = useState(null);
	const [loading,toggleLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setError(false);
			toggleLoading(true);

			try	{
				const result = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,current,daily&appid=${apiKey}&lang=nl`);
				setForecast(result.data);
				console.log(forecast);
			} catch (e) {
				console.error(e);
				setError(true);
			}

			toggleLoading(false);

		}

		if (coordinates !== null){
			fetchData();
		}

	},[coordinates]);


	return(
		<div className="tab-wrapper">
			<div className="chart">
				Hier komt de chart!
			</div>
			<div className="legend">
				<span>08:00 uur</span>
				<span>12:00 uur</span>
				<span>16:00 uur</span>
			</div>
		</div>
  );
};

export default TodayTab;
