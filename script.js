function search(city) {
  let apiKey = "9b41700e7dcfb48ddf3be545946f91cc";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrentWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let keyword = document.querySelector("#keyword");
  search(keyword.value);
}
function showCurrentWeather(response) {
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;

  let place = document.querySelector("#place");
  place.innerHTML = response.data.name;

  let weatherDescription = document.querySelector("#weatherDescription");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let minimumCurrentTemperature = document.querySelector(
    "#minimumCurrentTemperature"
  );
  minimumCurrentTemperature.innerHTML = Math.round(response.data.main.temp_min);

  let maximumCurrentTemperature = document.querySelector(
    "#maximumCurrentTemperature"
  );
  maximumCurrentTemperature.innerHTML = `-${Math.round(
    response.data.main.temp_max
  )}°C`;
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function displayWeatherCurrentLocation() {
  function showWeatherCurrentLocation(response) {
    let place = document.querySelector("#place");
    place.innerHTML = response.data.name;

    let currentTemperature = document.querySelector("#currentTemperature");
    currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;

    let weatherDescription = document.querySelector("#weatherDescription");
    weatherDescription.innerHTML = response.data.weather[0].description;

    let minimumCurrentTemperature = document.querySelector(
      "#minimumCurrentTemperature"
    );
    minimumCurrentTemperature.innerHTML = Math.round(
      response.data.main.temp_min
    );

    let maximumCurrentTemperature = document.querySelector(
      "#maximumCurrentTemperature"
    );
    maximumCurrentTemperature.innerHTML = `-${Math.round(
      response.data.main.temp_max
    )}°C`;
  }
  function newPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "9b41700e7dcfb48ddf3be545946f91cc";
    let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiEndPoint).then(showWeatherCurrentLocation);
  }
  navigator.geolocation.getCurrentPosition(newPosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", displayWeatherCurrentLocation);
