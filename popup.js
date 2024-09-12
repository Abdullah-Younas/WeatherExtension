document.getElementById('search-btn').addEventListener('click', fetchData);

async function fetchData() {
    try {
        const locationName = document.getElementById("locationinput").value;
        const capitalizedLocationName = locationName.charAt(0).toUpperCase() + locationName.slice(1);

        console.log(capitalizedLocationName);
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=84b498e0c1804836990170146241109&q=${capitalizedLocationName}&aqi=no`);

        if (!response.ok) {
            throw new Error("Could not fetch Data");
        }

        const data = await response.json();
        console.log(data);

        const location = data.location;
        const country = location.country;
        const city = location.name;
        const time = location.localtime;

        const current = data.current;
        const tempC = current.temp_c;
        const tempF = current.temp_f;
        const feelsLikeC = current.feelslike_c;
        const feelsLikeF = current.feelslike_f;
        const pressureC = current.pressure_mb;
        const pressureF = current.pressure_in;
        const windC = current.wind_kph;
        const windF = current.wind_mph;
        const humidity = current.humidity;
        const visibilityC = current.vis_km;
        const visibilityF = current.vis_miles;
        const weatherTXT = current.condition.text;

        let isCelsius = true;

        // Update the weather data on the page
        const currentLocation = document.getElementById("weathercurrentlocation");
        const currentTime = document.getElementById("currenttime");
        const currentTemp = document.getElementById("CurrentTemp");
        const currentFeelsLike = document.getElementById("feelslikeC");
        const currentPressure = document.getElementById("currentPressure");
        const currentWind = document.getElementById("currentWind");
        const currentHumidity = document.getElementById("currentHumidity");
        const currentVisibility = document.getElementById("currentVisibility");
        const weatherText = document.getElementById("weatherTXT");
        const changeUnitButton = document.getElementById("changeunit");

        currentTime.innerHTML = time;
        currentLocation.innerHTML = `${city}, ${country}`;
        currentHumidity.innerHTML = `${humidity}%`;
        weatherText.innerHTML = weatherTXT;

        // Function to update the displayed temperature
        function updateTemperature() {
            if (isCelsius) {
                currentTemp.innerHTML = `${tempC}°C`;
                currentFeelsLike.innerHTML = `Feels like ${feelsLikeC}°C`;
                currentPressure.innerHTML = `${pressureC} mb`;
                currentWind.innerHTML = `${windC} km/h`;
                currentVisibility.innerHTML = `${visibilityC} km`;
                changeUnitButton.innerHTML = "F°";
            } else {
                currentTemp.innerHTML = `${tempF}°F`;
                currentFeelsLike.innerHTML = `Feels like ${feelsLikeF}°F`;
                currentPressure.innerHTML = `${pressureF} in`;
                currentWind.innerHTML = `${windF} mp/h`;
                currentVisibility.innerHTML = `${visibilityF} miles`;
                changeUnitButton.innerHTML = "C°";
            }
        }

        // Initial temperature display
        updateTemperature();

        // Add event listener to toggle between Celsius and Fahrenheit
        document.getElementById('changeunit').addEventListener('click', () => {
            isCelsius = !isCelsius; // Toggle the temperature unit
            console.log(isCelsius ? "Celsius" : "Fahrenheit");
            updateTemperature(); // Update the displayed temperature
        });

    } catch (error) {
        console.error(error);
    }
}
