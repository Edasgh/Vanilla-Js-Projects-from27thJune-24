const apiKey = 'b3d8a02c'; // Replace with your actual OMDB API key

const searchButton = document.getElementById('searchButton');
const movieInput = document.getElementById('movieInput');
const movieDetails = document.getElementById('movieDetails');

searchButton.addEventListener('click', () => {
    const searchTerm = movieInput.value.trim();

    if (searchTerm === '') {
        return;
    }

    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(searchTerm)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                displayMovieDetails(data);
            } else {
                movieDetails.innerHTML = '<p>Movie not found</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            movieDetails.innerHTML = '<p>An error occurred while fetching data</p>';
        });
});

function displayMovieDetails(movie) {
    movieDetails.innerHTML = `
        <h2>${movie.Title}</h2>
        <img src="${movie.Poster}" alt="${movie.Title} Poster">
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
    `;
}
