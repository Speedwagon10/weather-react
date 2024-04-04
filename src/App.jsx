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

    const addBackgroundColor = (locaionTimeInHour) => {
        console.log(locaionTimeInHour)
        debugger
        if (locaionTimeInHour >= 5 && locaionTimeInHour < 12) {
            setTheme("morning");
        } else if (locaionTimeInHour >= 12 && locaionTimeInHour < 18) {
            setTheme("afternoon");
        } else if (locaionTimeInHour >= 18 && locaionTimeInHour < 23){
             setTheme("evening");
        } else {
            setTheme("night");
        }              
    } 

    const searchLocation = () => {
        if (!isEmpty && !error) {
            if (location !== "") {
                fetch(url)
                    .then((res) => res.json())
                    .then((data) => {
                        if (!data.error) {
                            setData(data);
                            console.log(data)
                            setLocation("");
                            locationHour = data.location.localtime.slice(
                                data.location.localtime.length - 5,
                                data.location.localtime.length - 3
                            );
                            addBackgroundColor(locationHour);
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
