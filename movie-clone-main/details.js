var allUrl = window.location.href

var res = window.location.href.split("=")[1];
const api_key = `16baca66e4b4b206c0b67a2ac88293cd`;
const signleImage = document.querySelector(".img-item");
const movieDiv = document.querySelector(".movie-detail-div")
const img_path = `https://image.tmdb.org/t/p/w1280`;
var isLoading = false;

//==================== Movies Details ====================//
const trending_movies = async () => {
    isLoading = true
    const data = await fetch(`https://api.themoviedb.org/3/movie/${res}?api_key=${api_key}&language=en-US`);
    isLoading = false
    const respData = await data.json();
    // console.log(respData);
    document.getElementById('imageDiv').innerHTML = `<img width="100" height="100" 
    src=${img_path}${respData.poster_path}>`;
    document.getElementById('movieName').innerHTML = respData.title
    document.getElementById('rating').innerHTML = `Rating: ${respData.popularity}`
    document.getElementById('genree').innerHTML = respData.genres.map((data, item) => {
        return data.name
    })
    document.getElementById('overview').innerHTML = respData.overview
    document.getElementById('movieDetails').innerHTML = `Details of ${respData.title}`

    //============================== Local Storage Set Item ==============================//
    
    const addToFav = document.getElementById('addToFav');
    

    addToFav.addEventListener('click', () => {
       var favourite_List = JSON.parse(localStorage.getItem('favourite'))||[];
        if(favourite_List.findIndex(favourite=>favourite.id === respData.id) === -1){
        favourite_List.push(respData);
            localStorage.setItem("favourite", JSON.stringify(favourite_List));
        window.alert("Item Added successfully");    
            console.log(res)
   
        }else{
        window.alert('This already store');
        }

    })

};

trending_movies()

const goBack = () => {
    window.location.replace('/');
}
