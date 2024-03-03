import { useState } from "react";
import Weather from "./components/Weather";
import {API_KEY} from './info.json';
import Input from "./components/Input";
import ModalError from "./components/ModalError";

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    const [error, setError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [theme, setTheme] = useState("afternoon");
    let locationHour;
    const NOTIFICATION_TIME = 6000;

    const APIKey = API_KEY;
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
                            switch (locationHour) {
                                case locationHour >= 5 && locationHour < 12:
                                    setTheme("morning");
                                    break;
                                case locationHour >= 12 && locationHour < 18:
                                    setTheme("afternoon");
                                    break;
                                case locationHour >= 18 && locationHour < 23:
                                    setTheme("evening");
                                    break;
                                default:
                                    setTheme("night");
                                    break;
                            }
                        } else {
                            setLocation("");
                            setTimeout(() => {
                                setError(false);
                            }, NOTIFICATION_TIME);
                            setError(true);
                        }
                    });
            } else {
                setTimeout(() => {
                    setIsEmpty(false);
                }, NOTIFICATION_TIME);
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
            {error && <ModalError text={"No matching location found"} />}
            {isEmpty && <ModalError text={"Field can not be empty"} />}
        </div>
    );
}
export default App;
