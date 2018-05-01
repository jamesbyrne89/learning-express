const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint).then(blob => blob.json())
    .then(data => cities.push(...data));

function findMatches(searchTerm, cities) {
    return cities.filter(place => {
        // Figure out if city or state matches search term
        const regex = new RegExp(searchTerm, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    })
}


function displayResults() {
    const resultsArray = findMatches(this.value, cities);
    const html = resultsArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="highlight">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="highlight">${this.value}</span>`);
        return `
		<li>
		<span class="placename">${cityName}, ${stateName}</span>
		<span class="population">${addCommas(place.population)}</span>
		</li>
		`;
    }).join('');
    console.log(html);
    suggestions.innerHTML = html;
}

// Add commas to population

function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayResults);
searchInput.addEventListener('keyup', displayResults);