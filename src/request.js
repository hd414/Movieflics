const API_KEY = 'cd53523310f1c138c91a1e2e2b1101f3';

const requests = {
    fetchTrending: `/trending/movie/week?api_key=${API_KEY}`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&language=en-US&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    fetchAnime: `/discover/tv?api_key=${API_KEY}&language=en-US&with_genres=16&with_original_language=ja`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
    fetchDocumentries: `/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
}

export default requests;