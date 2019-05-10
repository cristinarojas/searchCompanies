// DOM elements
let userInput = document.getElementById('search');
let resultsContainer = document.getElementById('results-container');

// New DOM elements
let listsElement = document.createElement('ul');

// Function for search
function handleSearch(value) {
  if (value.length === 0) {
    listsElement.innerHTML = '';
  } else if (value.length >= 3) {
    fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=/${value}`)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          listsElement.innerHTML = '<li>No results for this search</li>';
        } else {
          // If there are results from the search we show the data
          const searchResults = data;

          // Clean up the list every time a search is performed
          listsElement.innerHTML = '';

          searchResults.forEach(result => {
            // Creating elements
            const list = document.createElement('li');
            const logoImg = document.createElement('img');
            const companyName = document.createElement('span');
            const companyDomain = document.createElement('span');
            const linkDomain = document.createElement('a');

            // Adding classess & attributes to elements
            logoImg.className = 'logo';
            companyName.className = 'company-name';
            companyDomain.className = 'company-domain';
            linkDomain.setAttribute('href', `http://${result.domain}`);
            linkDomain.setAttribute('target', '_blank');
            logoImg.setAttribute('src', result.logo);

            companyName.innerHTML = result.name;
            linkDomain.innerHTML = result.domain;

            listsElement.appendChild(list);
            list.appendChild(logoImg);
            list.appendChild(companyName);
            companyDomain.appendChild(linkDomain);
            list.appendChild(companyDomain);

            // Adding all the results to ul parent
            resultsContainer.appendChild(listsElement);
          });
        }
      });
  }
}
