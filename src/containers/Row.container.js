import React, { useContext, useEffect, useState } from 'react'
import Banner from '../components/banner/banner.component'
import Loading from '../components/loading/loading.component';
import Modal from '../components/modal/modal.component';
import ModalDetails from '../components/modal/modalDetails.component';
import Row from '../components/Row/Row.component'
import { FirebaseContext } from '../context/firebase';
import { ProfileContext } from '../context/profile.context';
import requests from '../request';
import ProfileContainer from './profile';




const RowContainer = () => {

    const { showProfile, setShowProfile, loading, setLoading } = useContext(ProfileContext);
    const { firebase } = useContext(FirebaseContext);
    const user = firebase.auth().currentUser || {};

    const [profile, setProfile] = useState({});
    // const [loading, setloading] = useState(true);
    const [backdrop, setBackdrop] = useState(false);
    const [play, setplay] = useState(false);
    const [movie, setMovie] = useState('');


    useEffect(() => {
        if (!showProfile) {

            setTimeout(() => {
                setLoading(false);
            }, 3000)
        }
    }, [showProfile]);


    function BackdropHandler(movie) {
        setMovie(movie);
        // console.log("backdrop clicked");
        // console.log(backdrop, movie);
        setBackdrop(true);
    }

    function playHandler(movie) {
        setplay(true);
        BackdropHandler(movie);
    }

    function onCloseHandler() {
        setBackdrop(false);
        setplay(false);
    }


    console.log("loading", loading);

    return (
        <div>
            {
                !showProfile ?
                    (<>
                        {
                            loading ?
                                (<Loading src={user.photoURL} />) : <Loading.ReleaseBody />
                        }

                        <Banner BackdropHandler={playHandler} />

                        {
                            backdrop &&
                            (

                                <Modal
                                    show={backdrop}
                                    close={onCloseHandler}
                                    movie={movie}
                                >
                                    <ModalDetails movie={movie} playNow={play} />
                                </Modal>
                            )
                        }



                        <Row title={'Trending Now'}
                            fetchUrl={requests.fetchTrending}
                            isLargeRow
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                        />
                        <Row
                            title={'Anime'}
                            fetchUrl={requests.fetchAnime}
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                        />
                        <Row
                            title={'Top Rated'}
                            fetchUrl={requests.fetchTopRated}
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                        />
                        <Row
                            title={'Netflix Originals'}
                            fetchUrl={requests.fetchNetflixOriginals}
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                        />
                        <Row
                            title={'Comedy Movies'}
                            fetchUrl={requests.fetchComedyMovies}
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                        />
                        <Row
                            title={'Action Movies'}
                            fetchUrl={requests.fetchActionMovies}
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                        />
                        <Row
                            title={'Horror Movies'}
                            fetchUrl={requests.fetchHorrorMovies}
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                        />
                        <Row
                            title={'Romance Movies'}
                            fetchUrl={requests.fetchRomanceMovies}
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                        />



                       )
                    </>
                    )
                    : (<ProfileContainer user={user} setProfile={setProfile} />)
            }




        </div>
    )
}

export default RowContainer
