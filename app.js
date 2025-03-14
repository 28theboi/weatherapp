//Sanketh Gowda
//Period 8
//March 13th, 2025
//Uses open weather api to give you the weather of the place you choose
// Get references to DOM elements
let valueSearch = document.getElementById('valueSearch'); // Input field for city name
let city = document.getElementById('city'); // Section to display city name and flag
let temperature = document.getElementById('temperature'); // Section to display temperature and weather icon
let description = document.querySelector('.description'); // Paragraph to display weather description
let clouds = document.getElementById('clouds'); // Span to display cloud percentage
let humidity = document.getElementById('humidity'); // Span to display humidity percentage
let pressure = document.getElementById('pressure'); // Span to display atmospheric pressure
let form = document.querySelector("form"); // Form element for submitting city name
let main = document.querySelector("main"); // Main container for adding error styling

// Add an event listener to the form to handle submission
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (valueSearch.value != "") { // Check if the input field is not empty
        searchWeather(); // Call the function to fetch and display weather data
    }
});

// API key for OpenWeatherMap
let id = "9505fd1df737e20152fbd78cdb289b6a";

// Base URL for OpenWeatherMap API with units set to imperial (Fahrenheit)
let url = "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=" + id;

// Function to fetch weather data and update the UI
const searchWeather = () => {
    // Fetch weather data from the API using the city name entered by the user
    fetch(url + "&q=" + valueSearch.value)
        .then(responsive => responsive.json()) // Pass the response as JSON
        .then(data => {
            console.log(data); // Log the data for debugging purposes

            if (data.cod == 200) { // Check if the API response is successful
                // Update the city name and flag
                city.querySelector("figcaption").innerText = data.name;
                city.querySelector("img").src = "https://flagsapi.com/" + data.sys.country + "/shiny/32.png";

                // Update the temperature and weather icon
                temperature.querySelector("img").src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png';
                temperature.querySelector("figcaption span").innerText = data.main.temp;

                // Update the weather description
                description.innerText = data.weather[0].description;

                // Update cloud percentage, humidity, and pressure
                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            } else {
                // If the API response is not successful, show an error
                main.classList.add("error"); // Add an error class to the main container
                setTimeout(() => {
                    main.classList.remove("error"); // Remove the error class after 1 second
                }, 1000);
            }

            // Clear the input field after processing
            valueSearch.value = "";
        });
};

// Function to initialize the app with a default city
const intitApp = () => {
    valueSearch.value = "Washington"; // Set the default city to Washington
    searchWeather(); // Fetch and display weather data for the default city
};

// Call the initialization function when the script is loaded
intitApp();
