import "./input.css";

const Input = ({
    searchLocation,
    onKeyBoardSearchLocation,
    location,
    setLocation,
    error,
    isEmpty,
}) => {
    const onClickEvent = () => {
        if (!isEmpty && !error) {
            searchLocation();
        }
    };

    return (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
            <input
                type="text"
                className="form-input"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.currentTarget.value)}
                onKeyDownCapture={onKeyBoardSearchLocation}
            />
            <button
                className="form-button"
                type="button"
                onClick={onClickEvent}
            >
                Search
            </button>
        </form>
    );
};

export default Input;
