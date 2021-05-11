import React, { useContext, useEffect, useState } from 'react'
import Banner from '../components/banner/banner.component'
import Loading from '../components/loading/loading.component';
import Modal from '../components/modal/modal.component';
import ModalDetails from '../components/modal/modalDetails.component';
import Row from '../components/Row/Row.component'
import { ApiContext } from '../context/api.context';
import { FirebaseContext } from '../context/firebase';
import { ProfileContext } from '../context/profile.context';
// import requests from '../request';
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
    const [listItems, setListItems] = useState([]);
    const [addStatus, setAddStatus] = useState(false);

    const context = useContext(ApiContext);
    // console.log("context", context);

    useEffect(() => {
        if (!showProfile) {

            setTimeout(() => {
                setLoading(false);
            }, 3000)
        }
    }, [showProfile]);



    useEffect(() => {
        async function getListData() {
            const db = firebase.firestore();
            try {
                const res = await db.collection('movies').doc(user.uid).get();
                let datas = res.data().id;
                let data = [];
                for (const item in datas) {
                    data.push(datas[item]);
                }

                setListItems(data);
            }
            catch (e) {
                console.log(e.message)
            }
        }
        getListData();
        // console.log(listItems);
    }, [user]);



    // console.log(listItems)

    async function checkForStatus(movie) {
        let i = 0;
        for (i = 0; i < listItems.length; i++) {
            if (movie.id === listItems[i].id) {
                console.log("this is already added to list firend");
                setAddStatus(true);
                console.log("addstatus", addStatus);
                break;
            }
            else {
                setAddStatus(false);
            }
        }
    }

    async function BackdropHandler(movie) {
        await checkForStatus(movie);

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

    const onAddToList = async (movie) => {
        const db = firebase.firestore();
        try {

            if (addStatus) {
                const res = await db.collection('movies').doc(user.uid).update({
                    id: firebase.firestore.FieldValue.arrayRemove(movie)
                });


                let data = [];
                data = listItems;
                data = data.filter(film => film.id !== movie.id);
                setListItems(data);

                console.log(res);
                console.log("remove item");
            }
            else {
                const res = await db.collection('movies').doc(user.uid).update({
                    id: firebase.firestore.FieldValue.arrayUnion(movie)
                });

                let data = [];
                data = listItems;
                data = data.filter(film => film.id !== movie.id);
                data.push(movie);
                setListItems(data);
                console.log(res);
                console.log("add item")
            }


        }
        catch (e) {
            console.log(e.message)
            if (e.message.includes("No document to update")) {
                const res = await db.collection('movies').doc(user.uid).set({
                    id: firebase.firestore.FieldValue.arrayUnion(movie)
                });
                console.log(res);
            }
        }

    }

    // console.log("loading", loading);

    return (
        <div>
            {
                !showProfile ?
                    (<>
                        {
                            loading ?
                                (<Loading src={user.photoURL} />) : <Loading.ReleaseBody />
                        }

                        <Banner BackdropHandler={playHandler} Movies={context[3]} />

                        {
                            backdrop &&
                            (

                                <Modal
                                    show={backdrop}
                                    close={onCloseHandler}
                                    movie={movie}

                                >
                                    <ModalDetails movie={movie} playNow={play} addToList={onAddToList} added={addStatus} setAdded={setAddStatus} />
                                </Modal>
                            )
                        }



                        <Row title={'Trending Now'}
                            // fetchUrl={requests.fetchTrending}
                            isLargeRow
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                            Movies={context[0]}
                        />
                        <Row
                            title={'Anime'}
                            // fetchUrl={requests.fetchAnime}
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                            Movies={context[1]}
                        />
                        <Row
                            title={'Top Rated'}
                            // fetchUrl={requests.fetchTopRated}
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                            Movies={context[2]}
                        />
                        <Row
                            title={'Netflix Originals'}
                            // fetchUrl={requests.fetchNetflixOriginals}
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                            Movies={context[3]}
                        />
                        <Row
                            title={'Comedy Movies'}
                            // fetchUrl={requests.fetchComedyMovies}
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                            Movies={context[4]}
                        />
                        <Row
                            title={'Action Movies'}
                            // fetchUrl={requests.fetchActionMovies}
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                            Movies={context[5]}
                        />
                        <Row
                            title={'Horror Movies'}
                            // fetchUrl={requests.fetchHorrorMovies}
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                            Movies={context[6]}
                        />
                        <Row
                            title={'Romance Movies'}
                            // fetchUrl={requests.fetchRomanceMovies}
                            BackdropHandler={BackdropHandler}
                            playHandler={playHandler}
                            Movies={context[7]}
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
