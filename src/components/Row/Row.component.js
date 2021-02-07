import axios from '../../axios';
import React, { useState, useEffect } from 'react';
import './row.styles.css';




const Row = ({ title, fetchUrl, isLargeRow, BackdropHandler }) => {

    const baseImgUrl = 'https://image.tmdb.org/t/p/original/';
    const [movies, setMovies] = useState([]);
    // const [trailerUrl, setTrailerUrl] = useState('');
    // const [showDetails, setShowDetails] = useState(false);
    // const [movie, setmovie] = useState('');
    // console.log('movies', movies);

    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            console.log('movies', request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();

    }, [fetchUrl]);



    // const handleShowVideo = async () => {

    //     try {
    //         const TvVid = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=9d2bff12ed955c7f1f74b83187f188ae`)
    //         console.table('TvVid->', TvVid.data.results[TvVid.data.results.length - 1].key);
    //         setTrailerUrl(TvVid.data.results[0].key);
    //     }
    //     catch {

    //         try {
    //             const movieVid = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=9d2bff12ed955c7f1f74b83187f188ae`);
    //             console.table('movieVid -> ', movieVid.data.results[0].key);
    //             setTrailerUrl(movieVid.data.results[0].key);

    //         }
    //         catch {
    //             console.log("ERROR");
    //         }

    //     }


    //                     // movieTrailer(movie?.name || movie?.original_title || movie?.title || "")
    //                     //     .then((url) => {
    //                     //         // console.log(movie?.name)
    //                     //         // console.log('url', url);
    //                     //         if (!url) {
    //                     //             setTrailerUrl()
    //                     //         }
    //                     //         const urlParam = new URLSearchParams(new URL(url).search);
    //                     //         setTrailerUrl(urlParam.get('v'));
    //                     //     }).catch(error =>
    //                     //         console.log(error));
    //     setShowDetails(false);

    // }

    const handleClick = (movie) => {
        BackdropHandler(movie);

        // if (trailerUrl || showDetails) {
        //     setTrailerUrl('');
        //     setShowDetails(false);
        //     setmovie('');
        // }
        // else {
        //     // console.log('movie', movie?.name)
        //     // movieTrailer(movie?.name || movie?.original_title || movie?.title || "")
        //     //     .then((url) => {
        //     //         // console.log(movie?.name)
        //     //         // console.log('url', url);
        //     //         const urlParam = new URLSearchParams(new URL(url).search);
        //     //         setTrailerUrl(urlParam.get('v'));
        //     //     }).catch(error =>
        //     //         console.log(error));
        //     setShowDetails(true);
        //     setmovie(movie);
        // }
    }

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const checkNext = () => {
        const labels = document.querySelectorAll('#slider label');
        const nextIndex = selectedIndex === (labels.length - 1) ? 0 : selectedIndex + 1;
        setSelectedIndex(nextIndex);
    }

    return (

        <div className="row" >
            <h1>{title}</h1>

            <div className="row-posters">



                {
                    movies.map((movie) => {
                        return (

                            <img
                                key={movie.id}
                                onClick={() => handleClick(movie)}
                                className={`row-poster ${isLargeRow ? 'row-poster-large' : ''}`}
                                src={`${baseImgUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path
                                    }`}
                                alt={movie.name}
                            />


                        )
                    })
                }

            </div>
            {/* 
            {
                showDetails &&
                <div className="details">

                    <img
                        className="detail-image"
                        src={`${baseImgUrl}${movie.poster_path}`}
                        alt={movie?.name}
                    />

                    <div className="detail-text">
                        <h2>{movie?.name || movie?.original_title || movie?.title}</h2>
                        <h5>{truncate(movie?.overview, 500)}</h5>
                        <button className="detail-button" onClick={() => handleShowVideo()}>Play</button>
                    </div>
                </div>
            }
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
        </div >
    )
}

export default Row
