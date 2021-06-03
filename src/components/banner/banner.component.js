import React, { useEffect, useState } from 'react';
import './banner.styles.css';
import { Link, useHistory } from 'react-router-dom';

const Banner = ({ BackdropHandler, Movies }) => {

    const [movie, setMovie] = useState();

    const history = useHistory();

    let initVal = {
        backdrop_path: "/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg",
        first_air_date: "2016-01-25",
        genre_ids: [
            80,
            10765
        ],
        id: 63174,
        name: "Lucifer",
        origin_country: [
            "US"
        ],
        original_language: "en",
        original_name: "Lucifer",
        overview: "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.",
        popularity: 520.326,
        poster_path: "/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg",
        vote_average: 8.5,
        vote_count: 8557
    }



    useEffect(() => {
        async function fetchData() {
            // const request = await axios.get(requests.fetchComedyMovies);
            setMovie(Movies[Math.floor(Math.random() * Movies.length - 1)]);


            console.log(Math.floor(Math.random() * Movies.length - 1))


            console.log('banner ', movie);
            // return request;
        }
        fetchData();

    }, [])


    const handleplay = () => {

        if (movie)
            BackdropHandler(movie);
        else
            BackdropHandler(initVal)

    }



    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    // if(movie===undefined){
    console.log(movie);
    // }
    // if (movie === undefined) {
    //     history.push('/browse')
    // }

    return (
        <div className="banner-main">
            <header className="banner"

                style={{

                    backgroundImage: ` linear-gradient(
                        to bottom,
                        rgba(0, 0, 0, 0),
                        rgba(0, 0, 0, 0.4)
                      ),url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path ? movie?.backdrop_path : initVal.backdrop_path}")`,
                    height: window.outerHeight,
                    width: window.outerWidth
                }}

            >
                <div className="banner-content">
                    <h1 className="banner-title">
                        {movie?.title || movie?.name || movie?.original_name || initVal.name}
                    </h1>

                    <div className="banner_buttons">
                        <button onClick={() => handleplay()} className="banner_button">Play</button>
                        <Link to="/ListPage"><button className="banner_button">My list</button></Link>
                    </div>

                    <h2 className="banner-description">{movie ? truncate(movie?.overview, 150) : truncate(initVal?.overview, 150)}</h2>

                </div>

                <div className="banner-fade-bottom" />
            </header>

        </div >
    )
}

export default Banner
