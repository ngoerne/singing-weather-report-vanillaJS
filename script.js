let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let day = now.getDay();
let weekDays = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let weekDay = weekDays[day];
let month = now.getMonth();
let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let monthName = monthNames[month];

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
  let displayCurrentDate = document.querySelector("#currentDate");
  displayCurrentDate.innerHTML = `${weekDay}, ${monthName} ${date}, ${year}`;
}
let tomorrow = weekDays[now.getDay() + 1];
let dayAfterTomorrow = weekDays[now.getDay() + 2];
let twoDaysAfterTomorrow = weekDays[now.getDay() + 3];

function showWeatherPrediction() {
  let displayTomorrow = document.querySelector("#tomorrow");
  displayTomorrow.innerHTML = `${tomorrow}`;
  let displayDayAfterTomorrow = document.querySelector("#dayAfterTomorrow");
  displayDayAfterTomorrow.innerHTML = `${dayAfterTomorrow}`;
  let displayTwoDaysAfterTomorrow = document.querySelector(
    "#twoDaysAfterTomorrow"
  );
  displayTwoDaysAfterTomorrow.innerHTML = `${twoDaysAfterTomorrow}`;
}

function search(city) {
  let apiKey = "9b41700e7dcfb48ddf3be545946f91cc";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios
    .get(url)
    .then(showCurrentWeather)
    .then(showWeatherPrediction);
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function displayCurrentWeatherCurrentLocation() {
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
    let displayCurrentDate = document.querySelector("#currentDate");
    displayCurrentDate.innerHTML = `${weekDay}, ${monthName} ${date}, ${year}`;
  }
  function newPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "9b41700e7dcfb48ddf3be545946f91cc";
    let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios
      .get(apiEndPoint)
      .then(showCurrentWeather)
      .then(showWeatherPrediction);
  }
  navigator.geolocation.getCurrentPosition(newPosition);
}

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", displayCurrentWeatherCurrentLocation);
