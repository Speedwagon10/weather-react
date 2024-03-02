import { useState } from "react";
import Weather from "./components/Weather";
import Input from "./components/Input";
import ModalError from "./components/ModalError";

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    const [error, setError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [theme, setTheme] = useState("afternoon");
    let locationHour;

    const APIKey = "0b7bfcef963f4175b04143758241102";
    const url = `https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${location}&aqi=no`;

    const onKeyBoardSearchLocation = (e) => {
        if (e.key === "Enter" && !isEmpty && !error) {
            searchLocation();
        }
    };

    const searchLocation = () => {
        if (!isEmpty && !error) {
            if (location !== "") {
                fetch(url)
                    .then((res) => res.json())
                    .then((data) => {
                        if (!data.error) {
                            setData(data);
                            setLocation("");
                            locationHour = data.location.localtime.slice(
                                data.location.localtime.length - 5,
                                data.location.localtime.length - 3
                            );
                            console.log(locationHour);
                            if (locationHour >= 5 && locationHour < 12) {
                                setTheme("morning");
                                console.log(theme);
                            } else if (
                                locationHour >= 12 &&
                                locationHour < 18
                            ) {
                                setTheme("afternoon");
                                console.log(theme);
                            } else if (
                                locationHour >= 18 &&
                                locationHour < 23
                            ) {
                                setTheme("evening");
                                console.log(theme);
                            } else {
                                setTheme("night");
                                console.log(theme);
                            }
                            console.log(data);
                        } else {
                            setLocation("");
                            setTimeout(() => {
                                setError(false);
                            }, 6000);
                            setError(true);
                        }
                    });
            } else {
                setTimeout(() => {
                    setIsEmpty(false);
                }, 6000);
                setIsEmpty(true);
            }
        }
    };

    return (
        <div className={"app " + theme}>
            <Input
                location={location}
                setLocation={setLocation}
                onKeyBoardSearchLocation={onKeyBoardSearchLocation}
                searchLocation={searchLocation}
                error={error}
                isEmpty={isEmpty}
            />
            <Weather weatherData={data} />
            {error ? <ModalError text={"No matching location found"} /> : ""}
            {isEmpty ? <ModalError text={"Field can not be empty"} /> : ""}
        </div>
    );
}

export default App;
