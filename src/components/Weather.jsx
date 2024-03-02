import React, { useState } from "react";
import "./weather.css";

const Weather = ({ weatherData }) => {
    const [isF, setIsF] = useState(false);

    return (
        <>
            {typeof weatherData.current && weatherData.location ? (
                <div className="weather-card">
                    <div className="weather-card_content ">
                        <h2 className="">{weatherData.location.name}</h2>
                        <div className="img-block">
                            <img
                                src={weatherData.current.condition.icon}
                                alt=""
                            />
                        </div>
                        <h3 className="">{weatherData.location.country}</h3>
                        <h1 className="temp-content">
                            {isF
                                ? Math.round(weatherData.current.temp_f)
                                : Math.round(weatherData.current.temp_c)}{" "}
                            <span>
                                <sup>o</sup>
                                {isF ? "F" : "C"}
                            </span>
                        </h1>
                        <p>
                            Feels like:{" "}
                            {isF
                                ? Math.round(weatherData.current.feelslike_f)
                                : Math.round(weatherData.current.feelslike_c)}
                            <span>
                                <sup> o</sup>
                                {isF ? "F" : "C"}
                            </span>
                        </p>

                        <div className="parameters">
                            <div className="par-item">
                                <h4>Pressure</h4>
                                <div className="par-icon icon1"></div>
                                <p>
                                    {isF
                                        ? weatherData.current.pressure_in +
                                          " in"
                                        : weatherData.current.pressure_mb +
                                          " mb"}
                                </p>
                            </div>
                            <div className="par-item">
                                <h4>Wind</h4>
                                <div className="par-icon icon2"></div>
                                <p>
                                    {isF
                                        ? weatherData.current.wind_mph + " mph"
                                        : weatherData.current.wind_kph +
                                          " kmph"}
                                </p>
                            </div>
                            <div className="par-item">
                                <h4>Humidity</h4>
                                <div className="par-icon icon3"></div>
                                <p>{weatherData.current.humidity}%</p>
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={() => setIsF(!isF)}>
                        show in {isF ? "Celsius" : "Fahrenheit"}
                    </button>
                </div>
            ) : (
                <div className="weather-card">
                    <div className="weather-card_content ">
                        <h2 className=""> -----</h2>
                        <div className={"img-block " + "not"}></div>
                        <h3 className="">-----</h3>
                        <h1 className="temp-content">
                            --
                            <span>
                                <sup>o</sup>
                                {isF ? "F" : "C"}
                            </span>
                        </h1>
                        <p>Feels like: ---</p>

                        <div className="parameters">
                            <div className="par-item">
                                <h4>Pressure</h4>
                                <div className="par-icon icon1"></div>
                                <p>--- {isF ? "in" : "mb"}</p>
                            </div>
                            <div className="par-item">
                                <h4>Wind</h4>
                                <div className="par-icon icon2"></div>
                                <p>--- {isF ? "mph" : " kmph"}</p>
                            </div>
                            <div className="par-item">
                                <h4>Humidity</h4>
                                <div className="par-icon icon3"></div>
                                <p>---%</p>
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={() => setIsF(!isF)}>
                        show in {isF ? "Celsius" : "Fahrenheit"}
                    </button>
                </div>
            )}
        </>
    );
};

export default Weather;
