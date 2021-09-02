const errorSearch = document.getElementById('error-search');
const totalSearchVisibility = document.getElementById('total-search-visibility');
const resultsFoundVisibility = document.getElementById('results-found-visibility');

errorSearch.style.display = 'none';
totalSearchVisibility.style.display = 'none';
resultsFoundVisibility.style.display = 'none';

/* Search the book  */

const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const searchResult = document.getElementById('search-result');
    const totalSearch = document.getElementById('total-search');
    const resultsFound = document.getElementById('results-found');

    if (searchField.value === '') {
        errorSearch.style.display = 'block';
        totalSearchVisibility.style.display = 'none';
        resultsFoundVisibility.style.display = 'none';
        searchResult.innerHTML = '';
        totalSearch.innerText = '0';
        resultsFound.innerText = '0';
    }
    else {
        totalSearchVisibility.style.display = 'block';
        resultsFoundVisibility.style.display = 'block';
        searchField.value = '';
        searchResult.innerHTML = '';
        totalSearch.innerText = '';
        resultsFound.innerText = '';
        errorSearch.style.display = 'none';
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResultsFound(data.docs.length));
        fetch(url)
            .then(res => res.json())
            .then(data => displayTotalSearch(data.numFound));
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResults(data.docs));
    }
}

/* Display Search Results  */

const displaySearchResults = books => {
    const searchResult = document.getElementById('search-result');
    books.forEach(book => {
        const imgLocation = book.cover_i;
        const imgUrl = `https://covers.openlibrary.org/b/id/${imgLocation}-M.jpg`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card ">
        <img src="${imgUrl}" class="card-img-top p-2" alt="..." width="250" height="400">
        
        <div class="row g-0">
            <div class="col-6 col-md-4 text-center border border-secondary fw-bolder p-1"> BOOK NAME </div>
            <div class="col-sm-6 col-md-8 text-center border border-secondary fw-bolder fst-italic text-secondary p-1">${book.title}</div>
        </div>
        <div class="row g-0">
            <div class="col-6 col-md-4 text-center border border-secondary fw-bolder p-1"> AUTHOR NAME </div>
            <div class="col-sm-6 col-md-8 text-center border border-secondary fw-bolder fst-italic text-secondary p-1">${book.author_name}</div>
        </div>
        <div class="row g-0">
            <div class="col-6 col-md-4 text-center border border-secondary fw-bolder p-1"> PUBLISHER </div>
            <div class="col-sm-6 col-md-8 text-center border border-secondary fw-bolder fst-italic text-secondary p-1">${book.publisher}</div>
        </div>
        <div class="row g-0">
            <div class="col-6 col-md-4 text-center border border-secondary fw-bolder p-1"> FIRST PUBLISH YEAR </div>
            <div class="col-sm-6 col-md-8 text-center border border-secondary fw-bolder fst-italic text-secondary p-1">${book.first_publish_year}</div>
        </div>
    </div>
`;
        searchResult.append(div);
    });
}
const displayTotalSearch = totalNo => {
    const totalSearch = document.getElementById('total-search');
    totalSearch.innerText = `${totalNo}`;
}
const displayResultsFound = totalNo => {
    const resultsFound = document.getElementById('results-found');
    resultsFound.innerText = `${totalNo}`;
}