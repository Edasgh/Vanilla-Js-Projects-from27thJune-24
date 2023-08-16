const apiKey = 'b3d8a02c';
const searchButton = document.getElementById('searchButton');
const movieInput = document.getElementById('movieInput');
const movieDetails = document.getElementById('movieDetails');
const movieTitle = document.getElementById('movieTitle');
const moviePoster = document.getElementById('moviePoster');

searchButton.addEventListener('click', fetchMovieData);

function fetchMovieData() {
    const query = movieInput.value.trim();

    if (query === '') {
        return;
    }

    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${query}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                movieTitle.textContent = data.Title;
                moviePoster.src = data.Poster;
                movieDetails.classList.remove('hidden');
            } else {
                movieDetails.classList.add('hidden');
                alert('Movie not found!');
            }
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
            alert('An error occurred while fetching data.');
        });
}
