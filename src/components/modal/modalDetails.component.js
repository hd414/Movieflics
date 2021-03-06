import React, { useState } from 'react';
import './modal.css';
import YouTube from 'react-youtube';
import axios from '../../axios';


const ModalDetails = ({ movie, playNow }) => {
    const opts = {

        height: '500vh',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    }

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }


    const [trailerUrl, setTrailerUrl] = useState('');
    const [error, setError] = useState('');

    const PlayTrailer = async () => {

        try {
            const TvVid = await axios.get(`https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=9d2bff12ed955c7f1f74b83187f188ae`)
            // console.table('TvVid->', TvVid.data.results[TvVid.data.results.length - 1].key);
            setTrailerUrl(TvVid.data.results[0].key);
            setError('');
        }
        catch {

            try {
                const movieVid = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=9d2bff12ed955c7f1f74b83187f188ae`);
                // console.table('movieVid -> ', movieVid.data.results[0].key);
                setTrailerUrl(movieVid.data.results[0].key);
                setError('');

            }
            catch {
                console.log("ERROR");
                setError("error");
            }

        }


    }
    if (playNow == true) {
        PlayTrailer();
        playNow = false;
    }

    if (trailerUrl) {
        console.log(trailerUrl);
        return (
            <div style={{ height: "100%" }}>
                <YouTube videoId={trailerUrl} opts={opts} />
            </div>
        )
    }
    else {
        return (
            < div className="modal-details" >
                <div className="modal-header">
                    {movie.name || movie.title}
                </div >
                <div className="modal-overview">
                    <div style={{ color: 'green', fontWeight: 'bold', marginRight: 6 }}>Rating {movie.vote_average}/10</div>
                    <div>Release Date: {movie.first_air_date || movie.release_date}</div>
                </div>
                <div className="modal-body">
                    {truncate(movie.overview, 400)}
                </div>
                <div className="modal-btn">
                    <button className="btn1" onClick={PlayTrailer}>
                        <i className="play icon"></i> Play
                    </button>
                    <button className="btn2">
                        <i className="plus icon"></i> My list
                    </button>
                </div>
                {
                    error ?
                        <div style={{ color: "#D8000C", marginTop: "10px", padding: "0.5rem", backgroundColor: "#FFD2D2", width: "30vw" }} >
                            <h2 style={{ fontSize: "1rem", marginBottom: "0px" }}>Something went wrong ...</h2>
                            <h2 style={{ fontSize: "1rem", marginTop: "5px" }}>Please try again or enjoy another movie or series</h2>
                        </div>
                        :
                        null
                }

            </div >
        )
    }





}

export default ModalDetails;