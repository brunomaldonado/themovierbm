window.addEventListener("DOMContentLoaded", navigator, false)
window.addEventListener("hashchange", navigator, false)

brandButton.addEventListener('click', () => {
  location.hash = "#home";
  homePage();
  window.location.reload();
  // console.log("brandButton return to home");
})

searchBtn.addEventListener('click', () => {
  searchBox.classList.add('active');
  searchInput.classList.add('active');
  searchBtn.classList.add('active');
  cancelBtn.classList.add('active');
  // cancelBtn.classList.remove('active');

  const inputData = location.hash = "#search=" + searchInput.value.trim();
  searchInput.value = "";

  const query = inputData;
  const [_, input] = query.split('=');

  // console.log("search input", input)

  if (input === '') {
    getMostPopular()
    // console.log("empty string")    
  } 


  // console.log("input data", inputData)

  // if(inputData !== "") {
  //   const query = inputData;
  //   const [_, input] = query.split('=');

  //   console.log("search input", input)
  //   getMostPopular()
  //   headerTitle.innerText = `No results found` ;
  //   window.scrollTo(0, 0);
  // } else {
  //   headerTitle.innerText = `Search results found ${input}`;
  // }
  // console.log("search search addEventListener", searchFormInput.value);
})

btnOverlay.addEventListener('click', () => {
  searchBox.classList.add('active');
  searchInput.classList.add('active');
  searchBtn.style.display = "block";
  searchBtn.classList.add('active');
  cancelBtn.classList.add('active');
  cancelBtn.style.display = "block";
  btnOverlay.style.display = 'none';
  console.log("click button one")
})

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
      // toTop.classList.add('active');
      searchBox.classList.remove('active');
      searchInput.classList.remove('active');
      searchBtn.classList.remove('active');
      searchBtn.style.display = 'none';
      btnOverlay.classList.remove('active');
      btnOverlay.style.display = 'block';
      cancelBtn.classList.remove('active');
      cancelBtn.style.display = "none";
      searchInput.innerText = '';
} else {
      // toTop.classList.remove('active');
  }
})

cancelBtn.addEventListener('click', () => {
  searchBox.classList.remove('active');
  searchInput.classList.remove('active');
  searchBtn.classList.remove('active');
  cancelBtn.classList.remove('active');
  btnOverlay.style.display = 'block';
  searchInput.innerText = '';
})

trendsButton.addEventListener('click', () => {
  location.hash = "#trends=";
  window.scroll({
    top: 575,
    behavior: 'smooth'
  })
  // console.log("search trends addEventListener");
})

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
  // headerTitle.innerText = "Most Popular";
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
  // console.log("query", query);
  getMoviesBySearch(query.replaceAll("%20", "+"));

  if(_ !== "") {
    // console.log("query_search", query)
    headerTitle.innerText = `Search results found`;
    window.scrollTo(0, 0);
  } else {
    headerTitle.innerText = `No results found`;
  }

  // console.log("message", query.message);
  


  // headerTitle.innerText = categoryName;
  // headerTitle.innerText = "Search results found";

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
}