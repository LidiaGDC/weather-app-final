function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatWeekDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2"> 
      <div class ="forecast-date"> ${formatWeekDay(forecastDay.dt)}</div>
      <img class="forecast-icon"
       src="http://openweathermap.org/img/wn/${
         forecastDay.weather[0].icon
       }@2x.png"
       alt=""
       width="50px"
       />
       <div class ="weather-forecast-temperatures">
         <span class="forecast-temperature-max"> ${Math.round(
           forecastDay.temp.max
         )}°C </span>
         <span class="forecast-temperature-min"> ${Math.round(
           forecastDay.temp.min
         )}°C </span>
      </div>
      </div>  
   `;
    }
  });
  forecastHTML = forecastHTML + `</div> `;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "aabb459045170c682b91ab6157b00f6a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let city = document.querySelector("#city");
  let tempMax = document.querySelector("#tempMax");
  let tempMin = document.querySelector("#tempMin");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");

  celsiusTemp = Math.round(response.data.main.temp);
  celsiusTempMax = Math.round(response.data.main.temp_max);
  celsiusTempMin = Math.round(response.data.main.temp_min);

  temperature.innerHTML = Math.round(response.data.main.temp);
  city.innerHTML = response.data.name;
  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  console.log(response);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "aabb459045170c682b91ab6157b00f6a";
  let apiURl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");
  search(cityInput.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentCelsiusTemp.classList.remove("active");
  currentFahrenheitTemp.classList.add("active");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  currentCelsiusTemp.classList.add("active");
  currentFahrenheitTemp.classList.remove("active");
  currentTemp.innerHTML = Math.round(celsiusTemp);
}

function showMaxFahrenheitTemp(event) {
  event.preventDefault();
  let maxTemp = document.querySelector("#tempMax");
  let maxFahrenheitTemp = (celsiusTempMax * 9) / 5 + 32;
  maxTemp.innerHTML = Math.round(maxFahrenheitTemp);

  let fahrenheitSymbol = document.querySelector("#fahrenheittempmax");
  fahrenheitSymbol.classList.add("active");

  let celsiusSymbol = document.querySelector("#celsiustempmax");
  celsiusSymbol.classList.remove("active");
}

function showMaxCelsiusTemp(event) {
  event.preventDefault();
  let maxTemp = document.querySelector("#tempMax");
  maxTemp.innerHTML = Math.round(celsiusTempMax);

  let fahrenheitSymbol = document.querySelector("#fahrenheittempmax");
  fahrenheitSymbol.classList.remove("active");

  let celsiusSymbol = document.querySelector("#celsiustempmax");
  celsiusSymbol.classList.add("active");
}

function showMinFahrenheitTemp(event) {
  event.preventDefault();
  let minTemp = document.querySelector("#tempMin");
  let minFahrenheitTemp = (celsiusTempMin * 9) / 5 + 32;
  minTemp.innerHTML = Math.round(minFahrenheitTemp);

  let fahrenheitSymbol = document.querySelector("#fahrenheittempmin");
  fahrenheitSymbol.classList.add("active");

  let celsiusSymbol = document.querySelector("#celsiustempmin");
  celsiusSymbol.classList.remove("active");
}

function showMinCelsiusTemp(event) {
  event.preventDefault();
  let minTemp = document.querySelector("#tempMin");
  minTemp.innerHTML = Math.round(celsiusTempMin);

  let fahrenheitSymbol = document.querySelector("#fahrenheittempmin");
  fahrenheitSymbol.classList.remove("active");

  let celsiusSymbol = document.querySelector("#celsiustempmin");
  celsiusSymbol.classList.add("active");
}

let celsiusTemp = null;
let celsiusTempMax = null;
let celsiusTempMin = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentFahrenheitTemp = document.querySelector("#fahrenheittemp");
currentFahrenheitTemp.addEventListener("click", showFahrenheitTemperature);

let currentCelsiusTemp = document.querySelector("#celsiustemp");
currentCelsiusTemp.addEventListener("click", showCelsiusTemperature);

let maxFahrenheitTemp = document.querySelector("#fahrenheittempmax");
maxFahrenheitTemp.addEventListener("click", showMaxFahrenheitTemp);

let maxCelsiusTemp = document.querySelector("#celsiustempmax");
maxCelsiusTemp.addEventListener("click", showMaxCelsiusTemp);

let minFahrenheitTemp = document.querySelector("#fahrenheittempmin");
minFahrenheitTemp.addEventListener("click", showMinFahrenheitTemp);

let minCelsiusTemp = document.querySelector("#celsiustempmin");
minCelsiusTemp.addEventListener("click", showMinCelsiusTemp);

search("Madrid");
