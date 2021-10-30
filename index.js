const countries = document.querySelector(".countries");
const regions = document.querySelectorAll(".regions div");
const regionList = document.querySelector(".region-list");
const input =document.querySelector("input");
const theme = document.querySelector(".theme-toggle");
const html = document.querySelector("html");

// Logic for Theme

theme.addEventListener("click", () => {
  if (html.getAttribute("data-theme") === "light") {
    html.setAttribute('data-theme', 'dark');
    sessionStorage.setItem("themeName", 'dark');
    theme.innerHTML="<i class='far fa-sun'></i> Light Mode";
  } else {
    html.setAttribute('data-theme', 'light');
    sessionStorage.setItem("themeName", 'light');
    theme.innerHTML="<i class='far fa-moon'></i> Dark Mode";
  }
});

window.onload = function (){
    if(sessionStorage.getItem("themeName")==="dark"){
      html.setAttribute('data-theme', 'dark');
      theme.innerHTML="<i class='far fa-sun'></i> Light Mode";
    }else{
      html.setAttribute('data-theme', 'light');
      theme.innerHTML="<i class='far fa-moon'></i> Dark Mode";
    }
  }


async function getData(query) {
    let endpoint = "";
    if (query === "all") {
        endpoint = "all";
    } else {
        endpoint = `region/${query}`;
    }

    const url = `https://restcountries.com/v2/${endpoint}?fields=name,capital,region,population,flags`;
    const response = await fetch(url);
    return await response.json();
}

async function getCountryData(country){
    const url = `https://restcountries.com/v2/name/${country}`;
    const response = await fetch(url);
    return await response.json();
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function countryDiv(country) {
    const countryData = 
    
    `<div class="country">
        <div class="image">
             <img src=${country.flags.png} alt="country-image">
        </div>
        <div class="content">
            <div class="name" onclick="handleClick(event)">${country.name}</div>
            <div class="population">Population : <span>${numberWithCommas(country.population)}</span></div>
            <div class="region">Region : <span>${country.region}</span></div>
            <div class="capital">Capital : <span>${country.capital}</span></div>
        </div>
    </div>`

    return countryData;
}

function searchCountry(event){
    event.preventDefault();
    getCountryData(input.value)
    .then(data=>{
        let output = "";
        data.forEach(country => {
            output += countryDiv(country);
        });
        countries.innerHTML=output;
        input.value="";
    });
}

function displayData(query) {
    getData(query)
    .then(data => {
        let output = "";
        data.forEach(country => {
            output += countryDiv(country);
        });
        countries.innerHTML=output;
    });
}

regionList.addEventListener("click",()=>{
    document.querySelector(".regions").classList.toggle("toggle-list");
});


regions.forEach(region => {
    region.addEventListener("click", () => {
        displayData(region.innerText.toLowerCase());
    });
});


function handleClick(event) {
    let countryName = event.target.innerText;
    sessionStorage.setItem("countryName", countryName);
    window.location.assign("./country.html");
}




displayData("all");
