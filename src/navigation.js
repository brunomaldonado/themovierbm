brandButton.addEventListener('click', () => {
  location.hash = "#home";
  homePage();
  window.location.reload();
  // console.log("brandButton return to home");
})
searchFormButton.addEventListener('click', () => {
  const s = location.hash = "#search=" + searchFormInput.value.trim();
  searchFormInput.value = "";
  
  window.scroll({
    top: 570,
    behavior: 'smooth'
  })

  if(location.hash !== "undefined") {
    getMostPopular();
    window.scrollTo(0, 0);
  }
  // console.log("search search addEventListener", searchFormInput.value);
})
bannerButton.addEventListener('click', () => {
  location.hash = "#movie=";
  // console.log("search movie addEventListener");
})
trendsButton.addEventListener('click', () => {
  location.hash = "#trends=";
  window.scroll({
    top: 570,
    behavior: 'smooth'
  })
  // console.log("search trends addEventListener");
})

window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)

function navigator() {
  if (location.hash.startsWith("#trends")) {
    trendsPage()
  } else if (location.hash.startsWith("#search=")) {
    searchPage()

  } else if (location.hash.startsWith("#movie=")) {
    // console.log("movie details")
    movieDetailsPage()
  } else if (location.hash.startsWith("#tv=")) {
    // console.log("movie details")
    tvDetailsPage()
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage()
  } else {
    homePage()
  }
}

function homePage() {
  movieDetailSection.classList.add("inactive");
  bannerSliceSection.classList.remove("inactive");
  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  bannerSliceSection.classList.remove("inactive");
  headerTitle.innerText = "Most Popular";
  homeMoviesSection.classList.remove("inactive")
  relatedMovies.classList.add("inactive");
  
  // getPopularBannerPreviews();
  getTrendingMoviesPreview();
  getCategoriesPreview();
  getMostPopular();
  getUpcomingMoviesPreview();
  getNowPlayingMoviesPreview();
  // console.log("Home!!")
}
function categoriesPage() {
  bannerSliceSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  homeMoviesSection.classList.remove("inactive")
  relatedMovies.classList.add("inactive");
  console.log("Categories!!")

  //['#category', 'id-name']
  const [_, categoryData] = location.hash.split('=') 
  const [categoryId, categoryName] = categoryData.split('-');

  // headerTitle.innerText = categoryName;
  headerTitle.innerText = categoryName.replaceAll("%20", ' ');
  getMoviesByCategory(categoryId); 
  getCategoriesPreview();
  getUpcomingMoviesPreview();
  getNowPlayingMoviesPreview();
}

function movieDetailsPage() {
  movieDetailSection.classList.remove("inactive");
  bannerSliceSection.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  bannerSliceSection.classList.add("inactive");
  homeMoviesSection.classList.add("inactive")
  relatedMovies.classList.remove("inactive");
  
  // upcomingMoviesPreview.classList.add('active');
  // recomendedMoviesPreview.classList.add('active');

  window.scrollTo(0, 0);

  const [_, movieTvId] = location.hash.split('=');
  // console.log("id number", movieTvId);
  getMovieById(movieTvId);
}

function tvDetailsPage() {
  movieDetailSection.classList.remove("inactive");
  bannerSliceSection.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  bannerSliceSection.classList.add("inactive");
  homeMoviesSection.classList.add("inactive")
  relatedMovies.classList.remove("inactive");
  
  // upcomingMoviesPreview.classList.add('active');
  // recomendedMoviesPreview.classList.add('active');

  window.scrollTo(0, 0);

  const [_, tvId] = location.hash.split('=');
  getTvById(tvId);
}

function searchPage() {
  bannerSliceSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.remove("inactive"); //solect reference about the browser.
  homeMoviesSection.classList.remove("inactive")
  relatedMovies.classList.add("inactive");
  
  // ['#search', 'suits']
  const [_, query] = location.hash.split('=');
  getMoviesBySearch(query.replaceAll("%20", "+"));

  
  // headerTitle.innerText = categoryName;
  headerTitle.innerText = "Search results found";

  // console.log("Search!!");
  getCategoriesPreview();
  getUpcomingMoviesPreview();
  getNowPlayingMoviesPreview();
}
function trendsPage() {
  bannerSliceSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.remove("inactive"); //solect reference about the browser.
  headerTitle.innerText = "Trendings";
  homeMoviesSection.classList.remove("inactive")
  relatedMovies.classList.add("inactive");
  

  // const [_, movieTvId] = location.hash.split('=');
  // getMovTvById(movieTvId);

  getCategoriesPreview();
  getTrendingMovies();
  getUpcomingMoviesPreview();
  getNowPlayingMoviesPreview();
  // console.log("TRENDS!!")
}