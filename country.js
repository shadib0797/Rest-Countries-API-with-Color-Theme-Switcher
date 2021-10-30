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

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function searchCountry(country){
    fetch(`https://restcountries.com/v2/name/${country}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      const countryData = data.find(obj => obj.name==country);

      let output="";
        if(countryData.borders){
          countryData.borders.forEach(element => {
            output+=`<div>${element}</div>`;
          });
        }


        const container = document.querySelector(".container-country");

        container.innerHTML=`<div class="country-data">
        <img src=${countryData.flags.png} alt="country-flag">
        <div class="country-data-content">
            <h1 class="country-name">${countryData.name}</h1>
            <div class="details">
                <p class="native-name">Native Name: <span>${countryData.nativeName}</span></p>
                <p class="population">Population: <span>${numberWithCommas(countryData.population)}</span></p>
                <p class="region">Region: <span>${countryData.region}</span></p>
                <p class="sub-region">Sub Region: <span>${countryData.subregion}</span></p>
                <p class="capital">Capital: <span>${countryData.capital}</span></p>
                <p class="domain">Top Level Domain: <span>${countryData.topLevelDomain.map(elem=>elem)}</span></p>
                <p class="currencies">Currencies: <span>${countryData.currencies.map(elem=>elem.name)}</span></p>
                <p class="lang">Languages: <span>${countryData.languages.map(elem=>elem.name)}</span></p>
            </div>
            <div class="border-countries">Border Countries: <span>${output}</span></div>
        </div>
    </div>`
    });
}

searchCountry(sessionStorage.getItem("countryName"));

