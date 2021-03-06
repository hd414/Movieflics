import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import requests from '../../request';
import './banner.styles.css';

const Banner = ({ BackdropHandler }) => {

    const [movie, setMovie] = useState([]);




    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchComedyMovies);
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
            return request;
        }
        fetchData();

    }, [])


    const handleplay = () => {

        BackdropHandler(movie);

    }

    // console.log("banner", movie);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div>
            <header className="banner"

                style={{
                    background: `linear-gradient(to right, #2C5364, #203A43, #0F2027)`,
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    backgroundPosition: "center center",
                    padding: "10px",
                    backgroundSize: "100% 105%",
                    resize: "both",
                    backgroundRepeat: "no-repeat",


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

        </div>
    )
}

export default Banner
