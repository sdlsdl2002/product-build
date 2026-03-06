const generateBtn = document.getElementById('generate-btn');
const resultsContainer = document.getElementById('results-container');
const themeToggleBtn = document.getElementById('theme-toggle');
const weatherInfo = document.getElementById('weather-info');

// Weather Fetching (Open-Meteo)
function fetchWeather() {
    if (!navigator.geolocation) {
        weatherInfo.textContent = "Geolocation not supported";
        return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                const temp = data.current_weather.temperature;
                const weatherCode = data.current_weather.weathercode;
                const condition = getWeatherCondition(weatherCode);
                weatherInfo.textContent = `📍 Local Weather: ${temp}°C, ${condition}`;
            })
            .catch(() => {
                weatherInfo.textContent = "Failed to load weather";
            });
    }, () => {
        weatherInfo.textContent = "Location access denied";
    });
}

function getWeatherCondition(code) {
    if (code === 0) return "☀️ Clear";
    if (code <= 3) return "🌤️ Partly Cloudy";
    if (code <= 48) return "🌫️ Foggy";
    if (code <= 67) return "🌧️ Rainy";
    if (code <= 77) return "❄️ Snowy";
    if (code <= 99) return "⚡ Thunderstorm";
    return "☁️ Cloudy";
}

fetchWeather();

// Theme Toggle
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
});

// Lottery Generation Logic
function generateLotteryNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function getColor(number) {
    if (number <= 10) return '#fbc400'; // Yellow
    if (number <= 20) return '#69c8f2'; // Blue
    if (number <= 30) return '#ff7272'; // Red
    if (number <= 40) return '#aaa';    // Gray
    return '#b0d840';                  // Green
}

function createNumberElement(num) {
    const div = document.createElement('div');
    div.className = 'number';
    div.textContent = num;
    div.style.backgroundColor = getColor(num);
    return div;
}

generateBtn.addEventListener('click', () => {
    resultsContainer.innerHTML = ''; // Clear previous results

    for (let i = 0; i < 5; i++) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'numbers-line';
        
        const numbers = generateLotteryNumbers();
        numbers.forEach(num => {
            lineDiv.appendChild(createNumberElement(num));
        });
        
        resultsContainer.appendChild(lineDiv);
    }
});

// Generate first 5 sets on load
generateBtn.click();