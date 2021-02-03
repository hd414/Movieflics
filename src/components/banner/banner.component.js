import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import requests from '../../request';
import './banner.styles.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
const Banner = () => {

    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    const opts = {

        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    }


    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchActionMovies);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
            return request;
        }
        fetchData();

    }, [])


    const handleplay = () => {

        if (trailerUrl) {
            setTrailerUrl('');
        }
        else {

            movieTrailer(movie?.name || movie?.original_title || movie?.title || "")
                .then((url) => {
                    // console.log(movie?.name)
                    // console.log('url', url);
                    if (!url) {
                        setTrailerUrl()
                    }
                    const urlParam = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParam.get('v'));
                }).catch(error =>
                    console.log(error));
        }



    }

    // console.log("banner", movie);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div>
            <header className="banner"

                style={{
                    backgroundSize: "cover",
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    backgroundPosition: "center center",
                    padding: "10px"
                }}

            >
                <div className="banner-content">
                    <h1 className="banner-title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>

                    <div className="banner_buttons">
                        <button onClick={() => handleplay()} className="banner_button">Play</button>
                        <button className="banner_button">My list</button>
                    </div>

                    <h2 className="banner-description">{truncate(movie?.overview, 150)}</h2>

                </div>

                <div className="banner-fade-bottom" />
            </header>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Banner
