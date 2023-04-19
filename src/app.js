import axios from "axios";

const countryList = document.getElementById("country-list");

async function getCountries() {
    try {
        const result = await axios.get('https://restcountries.com/v3.1/all');
        const countries = result.data;

        countries.sort((a, b) => {
            return a.population - b.population;
        })

        countries.map((country) => {
            console.log(`land: ${country.name.common} regio: ${country.region}`)
            countryList.innerHTML += `
                <li class="country-info">
                    <img class="country-flag" src=${country.flags.png} alt="Flag of ${country.name.common}">
                    <h2 class=${getRegionClassString(country)}>${country.name.common}</h2>
                    <p>Has a population of ${country.population} people.</p>
                </li>
            `
        });

        // countryList.innerHTML += `
        //     <li class="country-info">
        //         <img class="country-flag" src=${countries[0].flags.png} alt="flag of ${countries[0].name.common}">
        //         <h2 class="${getRegionClassString(countries[0])}">${countries[0].name.common}</h2>
        //         <p>has a population of ${countries[0].population} people.</p>
        //     </li>
        // `
    } catch (e) {
        console.error(e)
    }
}

getCountries();

function getRegionClassString(country) {
    const region = country.region.toLowerCase();

    return "region-" + region;
}