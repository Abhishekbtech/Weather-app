import React, { useEffect, useState } from "react";
import './CityCard.css'
import WeatherIcon from "./WeatherIcon";

function CityCard({ cityName, onClose }) {
    const [weatherData, setWeatherData] = useState({});
    const [weatherCondition, setWeatherCondition] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=77b60caed084ca920156da9068278de6`);
                const data = await res.json();
                setWeatherData(data);
                if (data.weather && data.weather.length > 0) {
                    setWeatherCondition(data.weather[0].main.toLowerCase());
                }
            } catch (error) {
                console.error("Error fetching weather data: ", error);
            }
        }
        fetchData();
    }, [cityName]);

    return (
        <>
            <div className="blur-background"></div>
            <div className="city-card">
                <button className='clear' onClick={onClose}>X</button>
                <div>
                    <h1>Weather Report</h1>
                    <h2>{weatherData.name}, India</h2>
                    {weatherCondition && <WeatherIcon condition={weatherCondition} />}
                    <h3>Temp :&#127777; {weatherData.main ? ((weatherData.main.temp - 273.15).toFixed(0)) : "Loading..."}°C</h3>
                    <h4>Humidity: {weatherData.main ? weatherData.main.humidity : "Loading..."}%</h4>
                    <h4>Wind Seed: {weatherData.wind ? weatherData.wind.speed : "Loading..."}m/s</h4>
                    <h4>Visibility: {weatherData.visibility ? (weatherData.visibility / 1000).toFixed(1) : "Loading..."}km</h4>
                </div>
            </div>
        </>
    )
}

export default CityCard;
