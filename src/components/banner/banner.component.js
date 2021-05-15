import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import requests from '../../request';
import './banner.styles.css';
import { Link } from 'react-router-dom';

const Banner = ({ BackdropHandler, Movies }) => {

    const [movie, setMovie] = useState([]);




    useEffect(() => {
        async function fetchData() {
            // const request = await axios.get(requests.fetchComedyMovies);
            setMovie(Movies[Math.floor(Math.random() * Movies.length - 1)]);

            if (movie === undefined) {

            }
            console.log(Math.floor(Math.random() * Movies.length - 1))
            console.log('banner ', movie);
            // return request;
        }
        fetchData();

    }, [])


    const handleplay = () => {

        BackdropHandler(movie);

    }



    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <div>
            <header className="banner"

                style={{

                    backgroundImage: ` linear-gradient(
                        to bottom,
                        rgba(0, 0, 0, 0),
                        rgba(0, 0, 0, 0.4)
                      ),url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    padding: "10px",
                    resize: "both",
                    backgroundSize: "cover",
                    backgroundPosition: "top",


                }}

            >
                <div className="banner-content">
                    <h1 className="banner-title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>

                    <div className="banner_buttons">
                        <button onClick={() => handleplay()} className="banner_button">Play</button>
                        <Link to="/ListPage"><button className="banner_button">My list</button></Link>
                    </div>

                    <h2 className="banner-description">{truncate(movie?.overview, 150)}</h2>

                </div>

                <div className="banner-fade-bottom" />
            </header>

        </div >
    )
}

export default Banner
