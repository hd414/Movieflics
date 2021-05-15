import { createContext, useEffect, useState } from "react";
import axios from '../axios';
import requests from '../request';
export const ApiContext = createContext();


const Context = (props) => {

    const [TrendingMovies, setTrendingMovies] = useState([]);
    const [anime, setAnime] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [netflixOriginal, setNetflixOriginals] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [horrorMovies, setHorrorMovies] = useState([]);
    const [romanticMovies, setRomanticMovies] = useState([]);
    const [popularTv, setPopularTv] = useState([]);
    const [actionTv, setActionTv] = useState([]);
    const [animated, setAnimated] = useState([]);
    const [soap, setSoap] = useState([]);

    let movies = [];

    const baseImgUrl = 'https://image.tmdb.org/t/p/original/';




    useEffect(() => {
        async function fetchData(fetchUrl) {
            // console.log("context api is called")
            const request = await axios.get(fetchUrl);
            let data = [];
            // console.log('movies', request.data.results);
            data = request.data.results;

            setTrendingMovies(data);
            return request;
        }
        fetchData(requests.fetchTrending);
    }, [])

    useEffect(() => {
        async function fetchData(fetchUrl) {
            // console.log("context api is called")
            const request = await axios.get(fetchUrl);
            let data = [];
            // console.log('movies', request.data.results);
            data = request.data.results;

            setAnime(data);
            return request;
        }
        fetchData(requests.fetchAnime);
    }, [])

    useEffect(() => {
        async function fetchData(fetchUrl) {
            // console.log("context api is called")
            const request = await axios.get(fetchUrl);
            let data = [];
            // console.log('movies', request.data.results);
            data = request.data.results;

            setActionMovies(data);
            return request;
        }
        fetchData(requests.fetchActionMovies);
    }, [])

    useEffect(() => {
        async function fetchData(fetchUrl) {
            // console.log("context api is called")
            const request = await axios.get(fetchUrl);
            let data = [];
            // console.log('movies', request.data.results);
            data = request.data.results;

            setComedyMovies(data);
            return request;
        }
        fetchData(requests.fetchComedyMovies);
    }, [])

    useEffect(() => {
        async function fetchData(fetchUrl) {
            // console.log("context api is called")
            const request = await axios.get(fetchUrl);
            let data = [];
            // console.log('movies', request.data.results);
            data = request.data.results;

            setNetflixOriginals(data);
            return request;
        }
        fetchData(requests.fetchNetflixOriginals);
    }, [])

    useEffect(() => {
        async function fetchData(fetchUrl) {
            // console.log("context api is called")
            const request = await axios.get(fetchUrl);
            let data = [];
            // console.log('movies', request.data.results);
            data = request.data.results;

            setTopRated(data);
            return request;
        }
        fetchData(requests.fetchTopRated);
    }, [])

    useEffect(() => {
        async function fetchData(fetchUrl) {
            // console.log("context api is called")
            const request = await axios.get(fetchUrl);
            let data = [];
            // console.log('movies', request.data.results);
            data = request.data.results;

            setHorrorMovies(data);
            return request;
        }
        fetchData(requests.fetchHorrorMovies);
    }, [])

    useEffect(() => {
        async function fetchData(fetchUrl) {
            // console.log("context api is called")
            const request = await axios.get(fetchUrl);
            let data = [];
            // console.log('movies', request.data.results);
            data = request.data.results;

            setRomanticMovies(data);
            return request;
        }
        fetchData(requests.fetchRomanceMovies);
    }, [])

    useEffect(() => {
        async function fetchData(fetchUrl) {
            // console.log("context api is called")
            const request = await axios.get(fetchUrl);
            let data = [];
            // console.log('movies', request.data.results);
            data = request.data.results;

            setPopularTv(data);
            return request;
        }
        fetchData(requests.fetchPopularTv);
    }, [])


    useEffect(() => {
        async function fetchData(fetchUrl) {
            // console.log("context api is called")
            const request = await axios.get(fetchUrl);
            let data = [];
            // console.log('movies', request.data.results);
            data = request.data.results;

            setActionTv(data);
            return request;
        }
        fetchData(requests.fetchActionTv);
    }, [])



    useEffect(() => {
        async function fetchData(fetchUrl) {
            // console.log("context api is called")
            const request = await axios.get(fetchUrl);
            let data = [];
            // console.log('movies', request.data.results);
            data = request.data.results;

            setAnimated(data);
            return request;
        }
        fetchData(requests.fetchAnimatedTv);
    }, [])


    useEffect(() => {
        async function fetchData(fetchUrl) {
            // console.log("context api is called")
            const request = await axios.get(fetchUrl);
            let data = [];
            // console.log('movies', request.data.results);
            data = request.data.results;

            setSoap(data);
            return request;
        }
        fetchData(requests.fetchSoapTv);
    }, [])


    // useEffect(() => {
    //     async function fetchData(fetchUrl) {
    //         // console.log("context api is called")
    //         const request = await axios.get(fetchUrl);
    //         let data = [];
    //         // console.log('movies', request.data.results);
    //         data = request.data.results;
    //         let newData = movies;
    //         newData.push(data);
    //         setMovies(newData);
    //         return request;
    //     }
    //     fetchData(requests.fetchTrending);
    //     fetchData(requests.fetchAnime);
    //     fetchData(requests.fetchTopRated);
    //     fetchData(requests.fetchNetflixOriginals);
    //     fetchData(requests.fetchComedyMovies);
    //     fetchData(requests.fetchActionMovies);
    //     fetchData(requests.fetchHorrorMovies);
    //     fetchData(requests.fetchRomanceMovies);

    // }, [])


    movies.push(TrendingMovies,
        anime,
        topRated,
        netflixOriginal,
        comedyMovies,
        actionMovies,
        horrorMovies,
        romanticMovies,
        popularTv,
        actionTv,
        animated,
        soap
    );

    return (
        <ApiContext.Provider value={movies}>
            {props.children}
        </ApiContext.Provider>
    )
}

export default Context;