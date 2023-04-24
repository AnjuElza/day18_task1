const countries_url = "https://restcountries.com/v3.1/all";
const wrapper = document.querySelector('.wrapper');
const searchCountry = document.querySelector('#input-country');
const searchBar = document.querySelector('.search-bar');

async function fetchCountriesUrl(url){
    const response  = await fetch(url);
    const countries=await response.json();
    console.log(response)
  //  response.forEach(count => {
        for (const key in countries){
        showCountry(countries,key)
    };
}

fetchCountriesUrl(countries_url);

function showCountry(data,key) {
    const country = document.createElement('div');
    //const lat=[];
    //const lon=[];
     //lat[key]=data[key].latlng[0];
   // lon[key]=data[key].latlng[1];
   // console.log(lat[key])
    country.innerHTML = `
    <div class="container">
    <div class="row col-lg-4 col-sm-12">
            <div class="col">
                <div class="card text-bg-light mb-3" style="max-width: 18rem;">
                    <div class="card-header country-name"><h4>${data[key].name.official}</h4></div>
                    <div class="card-body">
                        <div class="country-img">
                            <img class="country-flag" src="${data[key].flags.png}"/> 
                        </div>
                        <p><span class="card-title">Capital:</span>${data[key].capital}</p>
                        <p><span class="card-title">Region:</span>${data[key].region}</p>
                        <p><span class="card-title">Country Code:</span>${data[key].cioc}</p>
                        <button class="btn btn-primary card-button" id='weatherDisplayBtn'>Click for Weather</button>
                        
                    </div>
                </div>
            </div>
    </div>
    </div>`
    wrapper.appendChild(country);
    //const weatherButton=[];
    //weatherButton[key] = document.querySelector("#key");
    //weatherButton[key].addEventListener('click', function(){
    //getWeatherData(lat[key],lon[key]);
    //});

//for each of the inner page to show
weatherButton= document.querySelector("#weatherDisplayBtn");
country.addEventListener('click', () => {
    getWeatherData(data,key);
    wrapper.style.display = 'none';
    searchBar.style.display = 'none';
 })
}
const weatherDisplayPage = document.querySelector('.weatherDisplayPage')

async function getWeatherData(data,key){
    console.log("test");
    weatherDisplayPage.style.display = 'block'; 
    //const weatherDisplayPage = document.createElement('div');
    lat=data[key].latlng[0];
    lon=data[key].latlng[1];
    console.log(lat);
   // console.log(lat);
   // country1.innerHTML="";
   weatherDisplayPage.innerHTML="Loading...";
 const weather_url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7999cbc68e1aee5b87b5f4126ace1ef9`;
 //console.log(weather_url);
 try{
    const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7999cbc68e1aee5b87b5f4126ace1ef9`);
    const weather1=await res.json();
   console.log(weather1); 
  // <thead>
   //<tr>
    // <th scope="col" id="heading">Weather</th>
   //</tr>
 //</thead>
   weatherDisplayPage.innerHTML = `
    <div class="display-weather">
    <h3 id="heading">Weather</h3>
    <table class="table weather-table table-bordered">
 
  <tbody>
  <tr>
  <th scope="row">Country</th>
  <td>${weather1.name}</td>
  
</tr>
    <tr class="table-primary">
      <th scope="row" >Temperature</th>
      <td>${weather1.main.temp}</td>
      
    </tr>
    <tr class="table-secondary">
      <th scope="row">Pressure</th>
      <td>${weather1.main.pressure}</td>
    </tr>
    <tr class="table-success">
    <th scope="row">Humidity</th>
    <td>${weather1.main.humidity}</td>
  </tr>
  <tr class="table-danger">
    <th scope="row">Wind Speed</th>
    <td>${weather1.wind.speed}</td>
  </tr>
  <tr class="table-warning">
      <th scope="row">Visibility</th>
      <td>${weather1.visibility}</td>
      
    </tr>
  </tbody>
</table>
  </div>
    `;
}catch(error){
    weatherDisplayPage.innerHTML=error;
}
//wrapper.appendChild(weatherDisplayPage);
}

function searchCountryByName(){
    searchCountry.addEventListener('input', () => {
        const countryName = [...document.querySelectorAll('.country-name')]
        let inputValue = searchCountry.value;
        countryName.forEach( (count) => {
           // console.log(count.parentElement.parentElement)
             if(count.textContent.toLowerCase().includes(inputValue.toLowerCase())) {
                count.parentElement.parentElement.style.display = 'block';
             } else {
                count.parentElement.parentElement.style.display = 'none';
             }
        })
    })
} 

searchCountryByName();
