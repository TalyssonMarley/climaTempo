const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");

const cityName = document.querySelector("#cityName");
const temp = document.querySelector("#temperature span");
const weatherDescription = document.querySelector("#weatherDescription")
const weatherIcon = document.querySelector("#weatherIcon");
const humidity = document.querySelector(".humidity span");
const wind = document.querySelector(".wind span");
const flag = document.querySelector('#weatherData img');

const weatherDataContainer = document.querySelector("#weatherData");
const errorMensage = document.querySelector('#erroMensage');

const getWeatherData = async (city) => {
  hideInfo();

  const  apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&units=metric&appid=cfceb3fd2346b68d8137fb36162c7367`;

  const apiResponse = await fetch(apiWeatherURL);
  const data = await apiResponse.json();
  
  if (apiResponse.status === 200) {
    return data;
  } else {
    showErrorMensage();
  }
}
const showWeaterData = async (city) => {
  const data = await getWeatherData(city);

  cityInput.value = "";

  cityName.innerText = data.name;
  temp.innerText = parseInt(data.main.temp);
  weatherDescription.innerText = data.weather[0].description;
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png` )
  humidity.innerText = `${data.main.humidity}%`;
  wind.innerText = `${data.wind.speed}km/h`;
  flag.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/32.png`);

  weatherDataContainer.style.display = 'block';
};

const showErrorMensage = () => {
  errorMensage.style.display = 'block';
}

const hideInfo = () => {
  weatherDataContainer.style.display = 'none';
  errorMensage.style.display = 'none';
}

searchBtn.addEventListener('click', (event)=> {
  event.preventDefault();

  const city = cityInput.value;

  showWeaterData(city);
});

cityInput.addEventListener('keyup', (event) => {
  if(event.code === "Enter") {
    const city = event.target.value;

  showWeaterData(city);
  }
})