//image sizes for tmdb
const img_300 = "https://image.tmdb.org/t/p/w300";
const img_500 = "https://image.tmdb.org/t/p/w500";
const img_original = "http://image.tmdb.org/t/p/original";
const no_image_holder = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";

// contentModal and singleContent
// const unavailable = "https://www.movienewz.com/img/films/poster-holder.jpg";
const unavailable = "https://www.linkpicture.com/q/no_thumbnail.jpg"

// contentModal
const unavailableLandscape = "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg";

// For Carousel
const noPicture = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";


// const notAvailable = 
// "https://www.feednavigator.com/var/wrbm_gb_food_pharma/storage/images/_aliases/news_large/9/2/8/5/235829-6-eng-GB/Feed-Test-SIC-Feed-20142.jpg";

const notAvailable = 
"https://i.ibb.co/y55nq8j/018c20i5z9n2-Bo9.jpg"


const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json:charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  }
})

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + '[...]' : str;
}

const getMovieInfo = async (movieId, type) => {
  let info = {};
  
  if (movieId) {
    switch (type) {
      case 'movie':
          // info = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
          // const dataMovie = await info.json();
          // console.log("data movie",dataMovie);
          info = await api(`movie/${movieId}?language=en-US`)
          break;
        case 'tv':
          // info = await fetch(`https://api.themoviedb.org/3/tv/${movieId}?api_key=${API_KEY}&language=en-US`)
          // const dataTv = await info.json();
          // console.log("data Tv2",dataTv);
          info = await api(`tv/${movieId}?language=en-US`)
          // console.log("info", info);
          break;
        default:
          info = null;
          break;
    }
  }

  return info;
}

// Utils 
// const lazyLoader = new IntersectionObserver((entries, observer) => {
//   entries.forEach((entry) => {
//     // console.log("entry", entry.target.setAttribute)
//     if(entry.isIntersecting) {
//       console.log({entry})
//       const url = entry.target.getAttribute('data-src');
//       entry.target.setAttribute('src', url);
//     }
//   })
// })

// let options = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0.5,
// }

// const lazy = (entries, observer) => {
//   entries.forEach((entry) => {
//     if(entry.isIntersecting) {
//       console.log("onserver", {entry})
      // const lazyImage = entry.target;
      // lazyImage.src = lazyImage.dataset.src;
      // entry.target.classList.add('show')
      // const url = entry.target.getAttribute('data-src');
      // entry.target.setAttribute('src', url);
//       observer.unobserve(entry.target)
//     }
//   })
// }

const observer = new IntersectionObserver((entries, observer) => {
  // console.log('entries', entries)
  // console.log('entries', observer)
  entries.forEach((entry) => {
    // const lazy = entry.target.classList.toggle('show', entry.isIntersecting)
    entry.target.classList.toggle('show', entry.isIntersecting)
    if(entry.isIntersecting) {
      // console.log('lazy', {lazy});
      const url = entry.target.getAttribute('data-src');
      entry.target.setAttribute('src', url);
      observer.unobserve(entry.target)
    }
  }, {
    // threshold: 0,
  })
})

async function getPopularBannerPreviews() {
  //  const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
  //   const data = await response.json();
  // console.log("trending", data.results);
  // const request = await api('/discover/tv?with_networks=213')
  const request = await api('movie/popular')
  // console.log("request", request.data)
  // const original = request.data.results;
  // console.log(original)
  // console.log("request", request.data.results);
  let original = request.data.results[Math.floor(Math.random() * request.data.results.length)]
  let {data} = await getMovieInfo(original.id, 'movie');
  // console.log("get Info", data);

  const title = document.querySelector('.title');
  const subTitle = document.querySelector('.subTitle');
  users_score.innerHTML = `${data.vote_average.toFixed(1) * 10}%`
  const overview = document.querySelector('.overview');
  title.innerText = `${data?.name || data?.original_title || data?.title}`;
  subTitle.innerText = `${data.tagline || data.original_name}`;
  overview.innerText = `${truncate(data.overview)}`;
  const span = document.createElement('span');
  span.id = 'showmore'
  // overview.appendChild(span);
  // document.getElementById('showmore').addEventListener('click', function(){
  //   // console.log("click")
  //   document.querySelector('.description').classList.toggle('active');
  // })
  const bg_image = document.querySelector('.objf');
  const banner_img = document.createElement('img');
  banner_img.className = 'clickP'
  banner_img.setAttribute('src', 'http://image.tmdb.org/t/p/original' + data.backdrop_path);
  banner_img.setAttribute('alt', data.title);
  bg_image.appendChild(banner_img);

  // document.querySelector('.banner_country').innerHTML = `${data}`
  document.querySelector('.banner_language').innerText= `${data.original_language}`
  document.querySelector('.banner_date').innerText= `${data.release_date}`
  document.querySelector('.banner_runtime').innerText= `${data.runtime}min`;
  const getGenres = []
  const getGenre = data.genres;
  // console.log('get', getGenre)
  getGenre.map((gender) => {
    // console.log(gender.name);
    const genderName = gender.name;
    getGenres.push(genderName);
  })
  // console.log('gender', getGenres);

  const genres = document.querySelector('#genre');
  genres.innerText = `${getGenres.join(', ')}.`;

  bannerButton.addEventListener('click', () => {
    location.hash = `#movie=${data.id}`;
  })

  /* score percentage */

  // const getClassByRate = (vote) => {
  //   let p = (vote * percentage) / 100

  //   if (p >= 80) {
  //     return "green";
  //   } else if(p >=60) {
  //     return "orange";
  //   } else {
  //     return "red";
  //   }
  // }
 
}


const trendingPreview_movieList = document.querySelector('.trendingPreview_movieList');
trendingPreview_movieList.innerHTML = "";

async function getTrendingMoviesPreview() {
  const {data} = await api('trending/movie/day');
  console.log(data.results);
  const trending = data.results;

  trending.forEach(movie => {
    const container = document.createElement('div')
    container.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`;
      // console.log("click poster trending movie home")
    })
    container.className = 'container_poster'
    const img = document.createElement('img');
    img.className = 'poster_image'
    img.setAttribute('src', unavailable)
    img.setAttribute('data-src', movie.poster_path ? 'http://image.tmdb.org/t/p/original' + movie.poster_path : unavailable)
    img.setAttribute('alt', movie.title);

    observer.observe(img)

    container.appendChild(img);
    trendingPreview_movieList.appendChild(container);
  })
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach(category => {
    const div = document.createElement('div');
    div.className = 'category_container';
    const button = document.createElement('button');
    button.className = 'category_btn';
    button.setAttribute('id', 'id' + category.id);
    button.addEventListener('click', (event) => {
      location.hash = `#category=${category.id}-${category.name}`;
      window.scroll({
        top: 566,
        behavior: 'smooth'
      })
    })
    const p = document.createElement('p');
    p.innerText = `${category.name}`;
    button.appendChild(p);
    div.appendChild(button)
    container.appendChild(div)
  })
}

async function getCategoriesPreview() {
  const {data} = await api('genre/movie/list');
  // console.log("data categories", data.genres);
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);
}


function leftCreateMovies(movies, container) {
  container.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie_container');
    movieContainer.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`
    })
    const img = document.createElement('img');
    img.className = 'poster_image skeleton'
    // img.classList.add('poster_image')
    img.setAttribute('src', unavailable)
    img.setAttribute('data-src', movie.poster_path ? `${img_original}/${movie.poster_path}` : unavailable);
    img.setAttribute('alt', movie.title);
    const date = document.createElement('span');
    const getString = `${movie?.release_date || movie?.first_air_date}`;
    const [year, mont, day] = getString.split('-');
    date.innerText = year;
    const title = document.createElement('p');
    title.className = 'poster_title'
    title.innerText = `${movie?.name || movie?.original_title || movie?.title}`

    observer.observe(img)
    // movieContainer.append(date, img);
    // containerCard.append(movieContainer, title);
    movieContainer.append(img, title);
    container.appendChild(movieContainer);
  })
}

async function getMostPopular() {
    // const request = await api('discover/movie?with_genres=99&language=pt-BR');
    const request = await api('/discover/tv?with_networks=213');
    // const request = await api('trending/movie/day');
    const {data} = await api('movie/popular')

   const firstData = request.data.results;
   const secondData = data.results;  
  //  console.log("secondData", secondData)

    const getArray = firstData.concat(secondData);
    // console.log("Array", getArray);

    const _randomslice = (array, size) => {
      let new_array = [...array];
      new_array.splice(Math.floor(Math.random()*array.length),1);
      return array.length <= (size+1) ? new_array : _randomslice(new_array, size);
    }

    const randomData = _randomslice(getArray, 20);

  leftCreateMovies(secondData, mostPopularPreviewGrid);
}

function rightCreateMovies(movies, container) {
  container.innerHTML = "";

  movies.forEach(movie => {
    const containerCard = document.createElement('div');
    containerCard.className = 'container_card';
    const containerImage = document.createElement('div');
    containerImage.className = 'container_image'
    const img = document.createElement('img');
    img.setAttribute('src', unavailable)
    img.setAttribute('data-src', 'http://image.tmdb.org/t/p/original' + movie.poster_path)
    img.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`
    })
    img.className = 'skeleton'
    const containerIfo = document.createElement('div');
    containerIfo.className = 'info';
    const title = document.createElement('p');
    title.innerText = `${movie?.name || movie?.original_title || movie?.title}`
    title.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`
    })
    title.className = 'title'
    const date = document.createElement('span');
    date.innerText = `${movie?.release_date}`;
    date.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`
    })
    date.className = 'date'

    observer.observe(img)

    containerIfo.append(title, date);
    containerImage.append(img)
    containerCard.append(containerImage, containerIfo);
    container.appendChild(containerCard);
  })
}

async function getUpcomingMoviesPreview() {
  const {data} = await api('movie/upcoming');
  // const {data} = await api('movie/now_playing')
  // console.log(data.results);
  // console.log("leght", data.results.length);

  const getData = data.results;
  // getData.splice(5)
  // console.log("Get data",getData);

  const _randomslice = (array, size) => {
    let new_array = [...array];
    new_array.splice(Math.floor(Math.random()*array.length),1);
    return array.length <= (size+1) ? new_array : _randomslice(new_array, size);
  }

  const randomData = _randomslice(getData, 5);
  // console.log("ranmdo data", randomData);

  rightCreateMovies(randomData, upcomingMoviesPreviewDetail);
  rightCreateMovies(randomData, upcomingMoviesPreviewHome);
}

async function getNowPlayingMoviesPreview() {
  const {data} = await api('movie/now_playing');
  const getData = data.results; 
  // console.log(data);

  const _randomslice = (array, size) => {
    let new_array = [...array];
  
    new_array.splice(Math.floor(Math.random() * array.length), 1);

    return array.length <= (size + 1) ? new_array : _randomslice(new_array, size)
  }

  const randomData = _randomslice(getData, 5);
  // console.log(randomData);

  rightCreateMovies(randomData, recomendedMoviesPreviewHome);
  rightCreateMovies(randomData, recomendedMoviesPreviewDetail);
}


async function getMoviesByCategory(id) {
  // const request = await api('discover/movie?with_genres=99&language=pt-BR');
  const request = await api('discover/tv', {
    params: {
      with_genres: id,
    }
  });
  // const request = await api('trending/movie/day');
  const {data} = await api('discover/movie', {
    params: {
      with_genres: id,
    }
  })

 const firstData = request.data.results;
 const secondData = data.results;  

  const getArray = firstData.concat(secondData);
  // console.log("Array", getArray);

  const _randomslice = (array, size) => {
    let new_array = [...array];
    new_array.splice(Math.floor(Math.random()*array.length),1);
    return array.length <= (size+1) ? new_array : _randomslice(new_array, size);
  }

  const randomData = _randomslice(getArray, 20);

leftCreateMovies(secondData, mostPopularPreviewGrid)
}

// minutes 26, 
async function getMoviesBySearch(query) {
  // const request = await api('discover/movie?with_genres=99&language=pt-BR');
  const request = await api('search/tv', {
    params: {
      query: query,
    }
  });
  // const request = await api('trending/movie/day');
  const {data} = await api('search/movie', {
    params: {
      query: query,
    }
  })

  // const person = await api('search/person', {
  //   params: {1
  //     query: query,
  //   }
  // })


 const firstData = request.data.results;
 const secondData = data.results;  
//  console.log("person", person)
//  console.log("secon data", secondData)

  const getArray = firstData.concat(secondData);
  // console.log("Array", getArray);

  const _randomslice = (array, size) => {
    let new_array = [...array];
    new_array.splice(Math.floor(Math.random()*array.length),1);
    return array.length <= (size+1) ? new_array : _randomslice(new_array, size);
  }

  const randomData = _randomslice(getArray, 20);

  // console.log("randomData", query)
  // if (query) {
  //   // getMostPopular();
  //   headerTitle.innerText = `No results were found with the "${query}", try another word...`;
  // } else {
  //   console.log("discover");
  // }
  leftCreateMovies(secondData, mostPopularPreviewGrid)
}

async function getTrendingMovies() {
  // const request = await api('discover/movie?with_genres=99&language=pt-BR');
  const request = await api('/discover/tv?with_networks=213');
  // const request = await api('trending/movie/day');
  const {data} = await api('trending/movie/day')

 const firstData = request.data.results;
 const secondData = data.results;  

  const getArray = secondData.concat(firstData);
  // console.log("Array", getArray);

  const _randomslice = (array, size) => {
    let new_array = [...array];
    new_array.splice(Math.floor(Math.random()*array.length),1);
    return array.length <= (size+1) ? new_array : _randomslice(new_array, size);
  }

  const randomData = _randomslice(getArray, 33);
  // console.log("random Data", randomData);

leftCreateMovies(secondData, mostPopularPreviewGrid);
}

async function getMovieById(id) {  
  previewTriller.innerHTML = "";
  // const infoMovie = await getMovieInfo(id, "movie")
  const infoMovie = await api(`movie/${id}`)
  const dataMovie = infoMovie.data;

  const movie_trailer = await getMovieTrailer(dataMovie.id);
  // console.log("movie trailer", movie_trailer);

  getImages(id)

  let languages = [];
  const spokenLanguage = dataMovie.spoken_languages;
  // console.log("language", spokenLanguage)

  spokenLanguage.map((language) => {
    // console.log("language:", language )
    const typeLanguages = language.name || language.english_name;
    languages.push(typeLanguages);
  })

  const genres = []
  const getGenre = dataMovie.genres;
  // console.log('get', getGenre)
  getGenre.map((gender) => {
    // console.log(gender.name);
    const genderName = `${gender.name}`;
    genres.push(genderName);
  })

  if(getGenre.length === 0) {
    categoryType.textContent = ` ;-)`;
    categoryType_inside.textContent = ` ;-)`;
  } else {
    // console.log("languages: ", languages.join(", "));
    categoryType.textContent = `${genres.join(', ')}.`;
    categoryType_inside.textContent = `${genres.join(', ')}.`;
  }

  // console.log("movie", dataMovie);
  movieDetailTitle.textContent = `${dataMovie?.name || dataMovie?.original_title || dataMovie?.title}`
  movieDetailSubTitle.textContent = dataMovie.tagline || dataMovie.original_name;
  vote_progress.innerHTML = `${dataMovie.vote_average.toFixed(1) * 10}%`;
  document.querySelector('.detail_runtime').innerText= `${dataMovie.runtime}min`;
  const [date, _] = dataMovie.release_date.split('-');
  document.querySelector('.detail_date').innerText = date;
  detailPoster_path.setAttribute('src', dataMovie.poster_path ? "http://image.tmdb.org/t/p/original" + dataMovie.poster_path : unavailable);
  detailBackdrop_path.setAttribute('src', dataMovie.backdrop_path ? "http://image.tmdb.org/t/p/original" + dataMovie.backdrop_path : "http://image.tmdb.org/t/p/original" + dataMovie.poster_path );
  detailOverview.textContent = truncate(dataMovie.overview);
  detailOverview_inside.textContent = truncate(dataMovie.overview, 280);
  typeLanguages.textContent = languages.join(', ') || dataMovie.original_language;
  typeLanguages_inside.textContent = languages.join(', ') || dataMovie.original_language;
  const companies = dataMovie.production_companies;
  if(companies.length === 0) {
    productionCompanies_inside.textContent = "";
    productionCompanies.textContent = "";
    document.querySelector('#release_date').style.marginLeft = "-1.5rem";
    document.querySelector('#release_date_inside').style.marginLeft = "-1.5rem";

    // console.log("error companies");
  } else {
    document.querySelector('#release_date').style.marginLeft = "0";
    document.querySelector('#release_date_inside').style.marginLeft = "0";
    productionCompanies_inside.textContent = companies[0].name;
    productionCompanies.textContent = companies[0].name;
  }
  // prodCompanies.map((company) => {
  //   console.log(company.logo_path);
  //   console.log(company.name);
  //   productionCompanies.textContent = `${company.name}`
  // })
  releaseDate.textContent = `${dataMovie.release_date}`;
  releaseDate_inside.textContent = `${dataMovie.release_date}`;
  const countries = dataMovie.production_countries;
  if (countries.length === 0) {
    productionCountries_inside.textContent = "";
    productionCountries.textContent = "";
    // console.log("error country")
  } else {
    // console.log(countries[0].iso_3166_1);
    productionCountries_inside.textContent = countries[0].iso_3166_1;
    productionCountries.textContent = countries[0].iso_3166_1;
  }
  createCategories(dataMovie.genres, categoriesList)
  getRelatedMoviesId(id)
  getBillyCast(id);
  getUpcomingMoviesPreview();
  getNowPlayingMoviesPreview();

  const div = document.createElement("div");
  div.className = "container_triller"
  div.innerHTML = 
  `
      <iframe src="https://www.youtube.com/embed/${movie_trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;

  previewTriller.appendChild(div);


}

async function getMovieTrailer(id) {
  const {data} = await api(`movie/${id}/videos`);
  // console.log("Trailer", data.results);
  const trailer = data.results
  const trailerKey = [];
  trailer.forEach((video) => {
    if(video.type === "Trailer") {
      // console.log("this is", video.key)
      trailerKey.push(video.key);
    }
  })

  // console.log("Trailer key: ", data.results[0].key);
  return trailerKey[0];
}

async function getTvById(id) {
  const infoTv = await getMovieInfo(id, "tv")
  const dataTv = infoTv.data;
  // console.log("info TV", dataTv)
  console.log("movie name ------- : ", dataTv.name || dataTv.original_title);

  getBillyCast(id);
}


async function getBillyCast(id) {
  // const {data} = await api(`movie/${id}/credits`)
  const {data} = await api(`movie/${id}/credits`);
  // console.log("data cast", data.cast);
  billyCast = data.cast;

  const filePath_scrollContainer = document.querySelector('.filePath_scrollContainer');
  filePath_scrollContainer.innerHTML = "";

  if(billyCast.length === 0) {
    document.querySelector('.billyCast_title').innerHTML = "";
    // console.log("Error billy cast")
     
  } else {
    document.querySelector('.billyCast_title').innerHTML = "Top Billy Cast";
    billyCast.forEach(cast => {
      // console.log("getId", cast);
      const divContainerCast = document.createElement('div')
      divContainerCast.className = 'container_cast'
      const divContainerImg = document.createElement('div');
      divContainerImg.addEventListener('click', (event) =>{
        location.hash = `#profile=${cast.id}`
        getPerson(cast.id);   
      })
      divContainerImg.className = 'billycontainer_img'
      const cast_img = document.createElement('img');
      cast_img.className = 'billy_img'
      cast_img.setAttribute('src', cast.profile_path ? `${img_original}/${cast.profile_path}` || no_image_holder : no_image_holder);
      cast_img.setAttribute('alt', cast.original_name);
      const divInfo = document.createElement('div');
      divInfo.className = 'perfil_info'
      const profileName = document.createElement('p');
      profileName.textContent = cast.original_name;
      const characterName = document.createElement('p');
      characterName.textContent = cast.character;
      const gradient_img = document.createElement('div');
      gradient_img.className = 'gradient_img';
  
      divInfo.append(profileName, characterName)
      divContainerImg.append(divInfo, cast_img, gradient_img);
      divContainerCast.append(divContainerImg);
      filePath_scrollContainer.append(divContainerCast);
    })
  }
 
}

async function getRelatedMoviesId(id) {
  // const {data} = await api(`movie/${id}/similar`);
  const {data} = await api(`movie/${id}/recommendations`);
  const relatedMov = data.results;
  // console.log("Related movies", relatedMov);

  leftCreateMovies(relatedMov, relatedMoviesPreviewGrid)
}

async function getImages(id) {
  const {data} = await api(`movie/${id}/images`);
  // console.log("images", data.backdrops);

  const backdropPaths = data.backdrops;
  // console.log("backdropPaths", backdropPaths);
  // console.log("backdropPaths", backdropPaths.length);
  
  const carousel_list = document.querySelector('.glider-track');
  carousel_list.innerHTML = "";

  let counter = 0;
  const container = document.querySelector('.slideshow');
  const overlay = document.querySelector('.overlay');
  const carouselImg_node = document.getElementsByClassName('glider-slide')
  const img_slideshow = document.querySelector('.slideshow img')

  backdropPaths.forEach((file) => {
    // console.log("file", file)
    const div = document.createElement('div')
    div.className = 'carousel_element glider-slide';

    // div.addEventListener('click', (event) => {
    //   console.log('click', event.target)
    //   // const img_select = +event.target.dataset.gslide;
    //   // img_slideshow.src
    // });

    const file_img = document.createElement('img');
    // file_img.className = 'tns-item tns-slide-cloned'
    // file_img.className = ''
    file_img.setAttribute('src', file.file_path ? `${img_original}/${file.file_path}` || no_image_holder : no_image_holder);
    div.appendChild(file_img);
    carousel_list.append(div);
  })

  Array.from(carouselImg_node).forEach(img => {
    img.addEventListener('click', event => {
      console.log("click");
      const image_select = +event.target.dataset.gslide
      const http = `${img_original}${backdropPaths[image_select].file_path}`;
      // console.log("http" , http)
      // img_slideshow.src = backdropPaths[image_select].file_path;
      img_slideshow.src = `${img_original}${backdropPaths[image_select].file_path}`;
      // console.log("img", img_slideshow);
      counter = image_select;
      overlay.style.opacity = 1;
      overlay.style.visibility = 'visible';

      const body = document.body;
      body.style.height = '100vh';
      body.style.overflowY = 'hidden';
    })
  })

  container.addEventListener('click', function(event) {
    let prev = container.querySelector('.btn_previous');
        next = container.querySelector('.btn_next');
        img = container.querySelector('img');
        tgt = event.target;
    if (tgt === prev) {
      // console.log("click previous");
      if (counter > 0) {
        img.src = `${img_original}${backdropPaths[counter - 1].file_path}`;
        counter--;
      } else {
        img.src = `${img_original}${backdropPaths[backdropPaths.length - 1].file_path}`;
        counter = backdropPaths.length - 1;
      }
    } else if(tgt === next) {
      // console.log("click next");
      if(counter < backdropPaths.length - 1) {
        img.src = `${img_original}${backdropPaths[counter + 1].file_path}`;
        counter++;
      } else {
        img.src = `${img_original}${backdropPaths[0].file_path}`;
        counter = 0;
      }
    }
  })

  btn_close.addEventListener('click', () => {
    overlay.style.visibility = 'hidden';
    overlay.style.opacity = 0;
    
    const body = document.body;
    body.style.height = 'auto';
    body.style.overflowY = 'auto';
  })
}

window.addEventListener("DOMContentLoaded", function() {
  new Glider(document.querySelector('.carousel_list'), {
    slidesToShow: 2,
    slidesToScroll: 1,
    draggable: true,
    dots: '.carousel_indicators',
    arrows: {
      prev: '.btn_previous',
      next: '.btn_next'
    },
    responsive: [
      {
        // screens greater than >= 775px
        breakpoint: 300,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 1,
          slidesToScroll: 1,
          itemWidth: 150,
          duration: 0.25
        }
      },{
        // screens greater than >= 775px
        breakpoint: 540,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 2,
          slidesToScroll: 1,
          itemWidth: 150,
          duration: 0.25
        }
      },{
        // screens greater than >= 1024px
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          itemWidth: 150,
          duration: 0.25
        }
      }, {
        // screens greater than >= 1024px
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          itemWidth: 150,
          duration: 0.25
        }
      }, {
        // screens greater than >= 1024px
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          itemWidth: 150,
          duration: 0.25
        }
      }, 

    ]
  });
})

async function getPerson(id) {
  const {data} = await api(`person/${id}?append_to_response=images`);
  // console.log("information person", data);
  // console.log("name", data.name);
  // console.log("biography", data.biography);
  // console.log("biography", data.profile_path);
  // console.log("also known as", data.also_known_as);
  const knownAs = [];
  const also_known_as = data.also_known_as;
  also_known_as.forEach(names => knownAs.push(names));
  // console.log("names", knownAs.toString());

  const request = await api(`person/${id}/movie_credits`);
  const filmsStaring = request.data.cast;
  // console.log("films movies", filmsStaring);

  const profileContainer = document.querySelector('.profile_container');
  const profileDescription = document.querySelector('.profile_description');
  profileDescription.innerHTML = "";
  const filmContainer = document.querySelector('.film_staring');
  const fimlsStaringList = document.querySelector('.fimls_staringList');
  fimlsStaringList.innerHTML = "";
  
  const slidesImages = document.createElement('div');
  slidesImages.className = 'slideshow_container';
  // const spanClose = document.createElement('span');
  // spanClose.innerText = 'X'
  // spanClose.className = 'btn_close';
  const buttonsSlide = document.createElement('div');
  buttonsSlide.className = 'buttons_slide'
  const btnPrevious = document.createElement('button');
  // btnPrevious.innerText = 'prev'
  btnPrevious.className = 'prev'
  const btnNext = document.createElement('button')
  // btnNext.innerText = 'next'
  btnNext.className = 'next'
  buttonsSlide.append(btnPrevious, btnNext);
  const carouselSlide = document.createElement('div')
  carouselSlide.className = 'profile_carouselSlide'
  const img = document.createElement('img');
  img.className = 'profile_poster';
  img.src = data.profile_path ? "http://image.tmdb.org/t/p/original" + data.profile_path : unavailable;

  const name = document.createElement('h1')
  name.className = 'profile_name';
  name.innerText = data.name;
  const birthday = document.createElement('span');
  birthday.className = 'profile_birthday'
  if(data.birthday == null) {
    birthday.innerText = "";
  } else {
    birthday.innerText = `(${data.birthday})`;
  }
  const alsoKnownAs = document.createElement('p');
  alsoKnownAs.className = 'also_known';
  // alsoKnownAs.innerText = `${knownAs.join(', ')}.`;
  if(knownAs.length < 3) {
    // console.log("none");
    document.querySelector('.profile_container').classList.toggle('active');
    alsoKnownAs.innerText = "";
  } else {
    document.querySelector('.profile_container').classList.remove('active');
    alsoKnownAs.innerText = `${knownAs.join(', ')}.`;
  }

  slidesImages.append(buttonsSlide, carouselSlide, img)
  // slidesImages.append(btnPrevious, carouselSlide, btnNext, img)
  // slidesImages.append(buttonsSlide, img)

  const placeOfBirth = document.createElement('p');
  placeOfBirth.innerText = data.place_of_birth;
  const biography = document.createElement('p');
  biography.innerText = data.biography;
  const span = document.createElement('span');
  span.id = 'span'
  const moviesStaring = document.querySelector('.films_movies');
  moviesStaring.innerText = `${data.name} movies`;
  
  // name.appendChild(birthday);
  // profileTitle.append(name, birthday);
  alsoKnownAs.appendChild(span);
  profileDescription.append(slidesImages, name, alsoKnownAs, placeOfBirth, biography)
  filmContainer.append(fimlsStaringList);
  // const fimls_staringList = document.querySelector('.fimls_staringList');
  // fimls_staringList.innerHTML = "";

  document.getElementById('span').addEventListener('click', function(){
    // console.log("click")
    document.querySelector('.profile_container').classList.toggle('active');
  })

  filmsStaring.forEach(movie => {
    const container = document.createElement('div')
    container.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`;
      // console.log("click poster trending movie home")
    })
    container.className = 'container_poster'
    const img = document.createElement('img');
    img.className = 'poster_image'
    img.setAttribute('src', unavailable)
    img.setAttribute('data-src', movie.poster_path ? "http://image.tmdb.org/t/p/original" + movie.poster_path : unavailable);
    img.setAttribute('alt', movie.title);

    observer.observe(img)

    container.append(img);
    fimlsStaringList.appendChild(container);
  })

  profileContainer.append(profileDescription, filmContainer);

  const getImagesProfile = data.images.profiles;
  // console.log(getImagesProfile)
  // if(getImagesProfile.length > 2) {
  //   console.log("+++++++")
  //   document.querySelector('.slideshow_container').classList.remove('active');
  // } else {
  //   console.log("------")
  //   document.querySelector('.slideshow_container').classList.add('active');
  // }

  const profile_carouselSlide = document.querySelector('.profile_carouselSlide')

  let counter = 0;
  const container = document.querySelector('.slideshow_container');
  // const carouselImg_node = document.getElementsByClassName('slide')
  // const img_slideshow = document.querySelector('.slideshow_container img')

  getImagesProfile.forEach((file) => {
    // console.log("file", file)
    const div = document.createElement('div')
    div.className = 'slide';
    const file_img = document.createElement('img');
    // file_img.className = 'tns-item tns-slide-cloned'
    file_img.className = 'profile_poster'
    file_img.setAttribute('src', file.file_path ? `${img_original}/${file.file_path}` || no_image_holder : no_image_holder);
    div.appendChild(file_img);
    profile_carouselSlide.append(div);
  })

  container.addEventListener('click', function(event) {
    let prev = container.querySelector('.buttons_slide .prev');
        next = container.querySelector('.buttons_slide .next');
        // img = container.querySelector('img');
        tgt = event.target;
    if (tgt === prev) {
      // console.log("click previous");
      if (counter > 0) {
        img.src = `${img_original}${getImagesProfile[counter - 1].file_path}`;
        counter--;
      } else {
        img.src = `${img_original}${getImagesProfile[getImagesProfile.length - 1].file_path}`;
        counter = getImagesProfile.length - 1;
      }
    } else if(tgt === next) {
      // console.log("click next");
      if(counter < getImagesProfile.length - 1) {
        img.src = `${img_original}${getImagesProfile[counter + 1].file_path}`;
        counter++;
      } else {
        img.src = `${img_original}${getImagesProfile[0].file_path}`;
        counter = 0;
      }
    }
  })
}



getPopularBannerPreviews()
