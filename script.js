const countries_url = "https://date.nager.at/api/v3/AvailableCountries";

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
                    <div class="card-header country-name"><h4>${data[key].name}</h4></div>
                    <div class="card-body">
                        
                        <p><span class="card-title">Country Code:</span>${data[key].countryCode}</p>
                       
                        <button class="btn btn-primary card-button" id='weatherDisplayBtn'>Click for Public Holidays</button>
                        
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
    getPublicHolidays(data,key);
    wrapper.style.display = 'none';
    searchBar.style.display = 'none';
 })
}
const weatherDisplayPage = document.querySelector('.weatherDisplayPage')

async function getPublicHolidays(data,key){
    console.log("test");
    weatherDisplayPage.style.display = 'block'; 
    country_code=data[key].countryCode;
    console.log(country_code);
   weatherDisplayPage.innerHTML="Loading...";
   ///api/v3/NextPublicHolidays/${countryCode}
 const weather_url=`https://date.nager.at/api/v3/NextPublicHolidays/${country_code}`;
 //console.log(weather_url);
 try{
    const res=await fetch(`https://date.nager.at/api/v3/NextPublicHolidays/${country_code}`);
    const weather1=await res.json();
   console.log(weather1); 
//    weatherDisplayPage.innerHTML= `
//   <div class="display-weather">
//   <h3 id="heading">Public Holidays in coming 365 days</h3>
// <table class="table weather-table table-bordered">

// <tbody>`
output = "<div class=\"display-weather\"><table id=\"table weather-table table-bordered\">";  //initialize output string
output +="<h3 id=\"heading\">Public Holidays in coming 365 days</h3>"
//build output string

for (const key in weather1){
  output  += "<tr>"
            + "<td>"+weather1[key].date+"</td>"
            + "<td>" + weather1[key].name +"</td>";
    }
output += "</tbody></table>";

weatherDisplayPage.innerHTML = output; //output to DOM
// weatherDisplayPage.innerHTML = "<table>";
    
// for (const key in weather1){
//   weatherDisplayPage.innerHTML += "<tr>"
//             + "<td>"+weather1[key].date+"</td>"
//             + "<td>" + weather1[key].name +"</td>";
//     }
    
//     weatherDisplayPage.innerHTML += "</table>";
  //  for (const key in weather1){
  //   showHolidays(weather1,key)
  //  }
//    weatherDisplayPage.innerHTML+= `
//    </tbody>
// </table>
// </div>
// `;
}catch(error){
    weatherDisplayPage.innerHTML=error;
}
//wrapper.appendChild(weatherDisplayPage);
}

function showHolidays(countries,key) {
  weatherDisplayPage.innerHTML+= `

<tr>
  
  <td>${countries[key].date}</td><td>${countries[key].name}</td>
</tr>
`;


  
  //weatherDisplayPage.appendChild(weatherDisplayPage);
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
