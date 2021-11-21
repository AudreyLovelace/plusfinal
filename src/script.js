let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
let h4 = document.querySelector("h4");
let section = document.querySelector("section");
let cel = document.querySelector("#cel");
let far = document.querySelector("#far");
let form = document.querySelector("form");
let city = document.querySelector("#city");
let button1 = document.querySelector("#button1");
let button2 = document.querySelector("#button2");
let li2 = document.querySelector("#li2>span");
let li3 = document.querySelector("#li3>span");
let img = document.querySelector("#bigimg");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function nowDate() {
  date = null;
  date = new Date();
  let weekday = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  h2.innerHTML = `${weekday} ${hour}:${minute}`;
}
nowDate();

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  if ((temperature < 10) & (temperature >= 0)) {
    h4.innerHTML = ` &nbsp${temperature}`;
  } else {
    h4.innerHTML = temperature;
  }
  h3.innerHTML = response.data.weather[0].description;

  h1.innerHTML = response.data.name;
  li2.innerHTML = Math.round(response.data.main.humidity);
  li3.innerHTML = Math.round(response.data.wind.speed);
  let iconid = response.data.weather[0].icon;
  img.setAttribute("src", `http://openweathermap.org/img/wn/${iconid}@2x.png`);
  img.setAttribute("alt", response.data.weather[0].description);
  function celChange() {
    if ((temperature < 10) & (temperature >= 0)) {
      h4.innerHTML = ` &nbsp${temperature}`;
    } else {
      h4.innerHTML = temperature;
    }
    cel.classList.add("spanChosed");
    far.classList.remove("spanChosed");
    far.classList.add("spanOrigin");

    searchCity1();
  }

  function farChange() {
    h4.innerHTML = `${Math.round(temperature * 1.8 + 32)}`;
    far.classList.add("spanChosed");
    cel.classList.remove("spanChosed");
    cel.classList.add("spanOrigin");

    searchCity1f();
  }
  cel.addEventListener("click", celChange);
  far.addEventListener("click", farChange);
}

function searchCity(cityName) {
  let apiKey = "eb0a1d7541da4e9c4f957db698ea2ffe";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function h1city(event) {
  event.preventDefault();

  if (city.value.trim() === "") {
    h1.innerHTML = `Please enter a valid city name`;
  }
  cel.classList.add("spanChosed");
  far.classList.remove("spanChosed");
  far.classList.add("spanOrigin");
  nowDate();
  searchCity();
  searchCity1();
}

button1.addEventListener("click", h1city);

function current1() {
  city.value = `New York`;
  cel.classList.add("spanChosed");
  far.classList.remove("spanChosed");
  far.classList.add("spanOrigin");

  searchCity();
  searchCity1();
}

current1();

let forcastElement = document.querySelector("section");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let forcastNum = date.getDay();
  return days[forcastNum];
}

function displayForcast(response) {
  let days = response.data.daily;

  let forcastHtml = "";
  days.forEach(function (day, index) {
    if ((index < 6) & (index > 0)) {
      forcastHtml =
        forcastHtml +
        `
        <div>
          <h6>${formatDay(day.dt)}</h6>
          <img
            id="forcastimg"
            src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
          />
          <p>
            ${Math.round(day.temp.max)}°<span>&nbsp</span>
            <span>${Math.round(day.temp.min)}°</span>
          </p>
        </div>`;
    }
  });
  forcastElement.innerHTML = forcastHtml;
}

function searchForcast(position) {
  let apiKey = "eb0a1d7541da4e9c4f957db698ea2ffe";
  let urlf = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.data.coord.lat}&lon=${position.data.coord.lon}&units=metric&appid=${apiKey}`;
  axios.get(urlf).then(displayForcast);
}

function searchForcastF(position) {
  let apiKey = "eb0a1d7541da4e9c4f957db698ea2ffe";
  let urlf = `https://api.openweathermap.org/data/2.5/onecall?lat=${position.data.coord.lat}&lon=${position.data.coord.lon}&units=imperial&appid=${apiKey}`;
  axios.get(urlf).then(displayForcast);
}

function searchCity1(position) {
  let apiKey = "eb0a1d7541da4e9c4f957db698ea2ffe";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(searchForcast);
}

function searchCity1f(position) {
  let apiKey = "eb0a1d7541da4e9c4f957db698ea2ffe";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(searchForcastF);
}
