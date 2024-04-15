import React from "react";

function WeatherIcon({ condition }) {
    console.log(condition)
    const weatherIcons = {
        "clear": "☀️",
        "clouds": "☁️",
        "rain": "🌧️",
        "thunderstorm": "⛈️",
        "snow": "❄️",
        "mist": "🌫️",
        "haze": "🌁"
    };

    const icon = weatherIcons[condition] || "❓";

    return <span style={{fontSize:50}}>{icon}</span>;
}

export default WeatherIcon;
