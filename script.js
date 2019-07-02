let apiKey = "9b41700e7dcfb48ddf3be545946f91cc";
let city = "Lisbon";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
function showCurrentTemperature(response) {
  let currentTemperature = document.querySelector("#currentTemperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);

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
  maximumCurrentTemperature.innerHTML = Math.round(response.data.main.temp_max);
}

axios.get(url).then(showCurrentTemperature);
