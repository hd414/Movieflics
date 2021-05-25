const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const requests = {
    fetchTrending: `/trending/movie/week?api_key=${API_KEY}`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&language=en-US&with_networks=213&adult=false`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&adult=false`,
    fetchAnime: `/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=16&with_original_language=ja&adult=false`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28&adult=false`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35&adult=false`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27&adult=false`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749&adult=false`,
    fetchDocumentries: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99&adult=false`,
    fetchPopularTv: `/discover/tv?api_key=${API_KEY}&language=en-US&page=1`,
    fetchActionTv: `/discover/tv?api_key=${API_KEY}&language=en-US&page=1&with_genres=10759`,
    fetchAnimatedTv: `/discover/tv?api_key=${API_KEY}&language=en-US&page=1&with_genres=16`,
    fetchSoapTv: `/discover/tv?api_key=${API_KEY}&language=en-US&page=1&with_genres=10766`,


}

export default requests;