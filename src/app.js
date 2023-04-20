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
            const {population, region, name: {common}, flags: {png}} = country;

            countryList.innerHTML += `
                <li class="country-info">
                    <img class="country-flag" src=${png} alt="Flag of ${common}">
                    <h2 class=${getRegionClassString(country)}>${common}</h2>
                    <p>Has a population of ${population} people.</p>
                </li>
            `
        });
    } catch (e) {
        console.error(e)
    }
}

getCountries();

function getRegionClassString(country) {
    const region = country.region.toLowerCase();

    return "region-" + region;
}