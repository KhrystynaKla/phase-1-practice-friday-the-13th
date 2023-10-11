const movieListNavElement = document.getElementById('movie-list')
const watchedButton = document.getElementById('watched')
let currentMovies;
let currentMovieDisplayed;
let currentMovieDisplayedMovieId;
const bloodForm = document.getElementById('blood-form')



fetch('http://localhost:3000/movies')
.then(response => response.json())
.then(movies =>{
    currentMovies=movies
    displayMovieItemDetails(currentMovies[0])
    currentMovies.forEach(movie =>{
        addMovieToMenu(movie)
    })
})

function addMovieToMenu(movie){
    const movieImg =document.createElement('img');
    movieImg.src = movie.image
    movieListNavElement.appendChild(movieImg)
    movieImg.addEventListener('click', ()=> displayMovieItemDetails(movie))
}

function displayMovieItemDetails(movie){
    currentMovieDisplayed=movie;
    currentMovieDisplayedMovieId=movie.id
    const detailImage = document.getElementById('detail-image');
    const title = document.getElementById('title')
    const yearReleased = document.getElementById('year-released')
    const movieDescription = document.getElementById('description')
    const amount = document.getElementById('amount');
    detailImage.src = movie.image
    title.textContent=movie.title
    yearReleased.textContent= movie.release_year
    movieDescription.textContent=movie.description
    amount.textContent=movie.blood_amount

    if(movie.watched === false){
        watchedButton.textContent='UNWATCHED'
    }

    
}
let bool; 

watchedButton.addEventListener('click', ()=>{
    if(watchedButton.textContent==='UNWATCHED'){
        watchedButton.textContent='WATCHED'
        currentMovieDisplayed.watched = true
        bool = currentMovieDisplayed.watched
    } else { 
        watchedButton.textContent='UNWATCHED'
        currentMovieDisplayed.watched = false
        bool = currentMovieDisplayed.watched
    }

    // currentMovies=currentMovies.map(movie => {
    //     if(movie.id === currentMovieDisplayed.id){
    //         return {...movie, watched: bool }
    //     } else {
    //         return movie
    //     }
    // })

    movieListNavElement.innerHTML=''
    currentMovies.forEach(movie => {
        addMovieToMenu(movie)
    })

    // fetch(`http://localhost:3000/movies/${currentMovieDisplayedMovieId}`,{
    //     method: 'PATCH',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     },
    //     body: JSON.stringify({watched: bool})
    // })
})


bloodForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const bloodAmountInput = document.getElementById('blood-amount');
    const amount = document.getElementById('amount');
    const sum = Number(bloodAmountInput.value)+ Number(amount.textContent);
    amount.textContent=sum;


    currentMovies= currentMovies.map(movie=>{
        if(movie.id ===currentMovieDisplayed.id){
            return {...movie, blood_amount: sum}
        } else {
            return movie
        }
    })

    movieListNavElement.innerHTML='';
    currentMovies.forEach(movie =>{
        addMovieToMenu(movie)
    })
    bloodForm.reset()
    fetch(`http://localhost:3000/movies/${currentMovieDisplayedMovieId}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({blood_amount:sum})
    })

})