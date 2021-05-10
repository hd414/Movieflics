import { createContext, useEffect, useState } from "react";
import axios from '../axios';
import requests from '../request';
export const ApiContext = createContext();


const Context = (props) => {
    const [movies, setMovies] = useState([]);
    const baseImgUrl = 'https://image.tmdb.org/t/p/original/';
    useEffect(() => {
        async function fetchData(fetchUrl) {
            // console.log("context api is called")
            const request = await axios.get(fetchUrl);
            let data = [];
            // console.log('movies', request.data.results);
            data = request.data.results;
            let newData = movies;
            newData.push(data);
            setMovies(newData);
            return request;
        }
        fetchData(requests.fetchTrending);
        fetchData(requests.fetchAnime);
        fetchData(requests.fetchTopRated);
        fetchData(requests.fetchNetflixOriginals);
        fetchData(requests.fetchComedyMovies);
        fetchData(requests.fetchActionMovies);
        fetchData(requests.fetchHorrorMovies);
        fetchData(requests.fetchRomanceMovies);

    }, [])

    return (
        <ApiContext.Provider value={movies}>
            {props.children}
        </ApiContext.Provider>
    )
}

export default Context;