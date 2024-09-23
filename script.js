const apiKey = '1274d7780f57033ed9118ea96db99182'; 
const searchButton = document.getElementById('search-button');
const searchInput = document.querySelector('.searchbar');
const weatherElement = document.getElementById('weather');
const cityNameElement = document.getElementById('city-name');
const tempElement = document.getElementById('temp');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const iconElement = document.getElementById('weather-icon');
const toggleThemeButton = document.getElementById('toggle-theme');

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        if (response.ok) {
            cityNameElement.innerText = data.name;
            tempElement.innerText = `${Math.round(data.main.temp)}°C`;
            descriptionElement.innerText = data.weather[0].description;
            humidityElement.innerText = `Humidity: ${data.main.humidity}%`;
            windElement.innerText = `Wind speed: ${data.wind.speed} km/h`;
            iconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            weatherElement.style.display = 'block'; // Show weather information
        } else {
            alert('City not found');
            weatherElement.style.display = 'none';
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        weatherElement.style.display = 'none';
    }
};

searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

getWeather('Durgapur');

let isDarkMode = false;

toggleThemeButton.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode', isDarkMode);
    toggleThemeButton.innerText = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
});
