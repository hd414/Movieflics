import React, { useContext, useEffect, useState } from 'react'
import Banner from '../components/banner/banner.component'
import Card from '../components/card/card.component'
import Loading from '../components/loading/loading.component';
import Navbar from '../components/Navbar/navbar.component';
import Row from '../components/Row/Row.component'
import { FirebaseContext } from '../context/firebase';
import requests from '../request';
import ProfileContainer from './profile';


const RowContainer = () => {

    const { firebase } = useContext(FirebaseContext);

    const user = firebase.auth().currentUser || {};

    const [profile, setProfile] = useState({});
    const [loading, setloading] = useState(true);


    useEffect(() => {

        setTimeout(() => {
            setloading(false);
        }, 3000)
    }, [profile.displayName]);




    return (
        <div>
            {
                profile.displayName ?
                    (<>
                        {
                            loading ?
                                (<Loading src={user.photoURL} />) : <Loading.ReleaseBody />
                        }
                        <Navbar />
                        <Banner />
                        <Card.Group>

                            <Row title={'Trending Now'} fetchUrl={requests.fetchTrending} isLargeRow />
                            <Row title={'Anime'} fetchUrl={requests.fetchAnime} />
                            <Row title={'Top Rated'} fetchUrl={requests.fetchTopRated} />
                            <Row title={'Netflix Originals'} fetchUrl={requests.fetchNetflixOriginals} />
                            <Row title={'Comedy Movies'} fetchUrl={requests.fetchComedyMovies} />
                            <Row title={'Action Movies'} fetchUrl={requests.fetchActionMovies} />
                            <Row title={'Horror Movies'} fetchUrl={requests.fetchHorrorMovies} />
                            <Row title={'Romance Movies'} fetchUrl={requests.fetchRomanceMovies} />
                            <Row title={'Documentries'} fetchUrl={requests.fetchDocumentries} />
                        </Card.Group>

                       )
                    </>
                    )
                    : (<ProfileContainer user={user} setProfile={setProfile} />)
            }




        </div>
    )
}

export default RowContainer
