import React, { useContext, useEffect, useState } from 'react'
import SearchComponent from '../../components/Search/search.component';
import { SearchContext } from '../../context/search.context';
import axios from '../../axios';
import './search.scss'
import Modal from '../../components/modal/modal.component';
import ModalDetails from '../../components/modal/modalDetails.component';
import { FirebaseContext } from '../../context/firebase';

const Search = () => {

    const API_KEY = 'cd53523310f1c138c91a1e2e2b1101f3';
    const baseImgUrl = 'https://image.tmdb.org/t/p/original/';
    const { searchQuery, setSearchQuery } = useContext(SearchContext);
    // console.log("search -> ", searchQuery);

    const { firebase } = useContext(FirebaseContext);
    const user = firebase.auth().currentUser || {};

    const [searchItems, setSearchItems] = useState([]);

    // console.log("searchQuery - ", searchQuery);

    const [backdrop, setBackdrop] = useState(false);
    const [play, setplay] = useState(false);
    const [movie, setMovie] = useState('');


    const [listItems, setListItems] = useState([]);
    const [addStatus, setAddStatus] = useState(false);



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

    useEffect(() => {
        async function changeQuery() {
            let value = searchQuery.split(" ").join("%20");
            // console.log("value ", searchQuery);
            const url = `/search/multi?api_key=${API_KEY}&language=en-US&query=${value}&page=1&include_adult=false`;
            const request = await axios.get(url);
            setSearchItems(request.data.results);
            // console.log('Search items -> ', request.data.results);
            return request;
        }

        changeQuery();

    }, [searchQuery])

    return (
        <div>
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



            <div className="search-page">
                <h1></h1>
                <h1 className="search-page__title">Search Results</h1>
                <div className="search-page__outer">
                    {
                        searchItems?.length === 0 ?
                            <div style={{ color: "white", marginLeft: "0%", lineHeight: "3" }}>
                                <h2>No Search Result available</h2>
                                <ul>
                                    <li><h4>Try different keyword</h4></li>
                                    <li><h4>keyword may have some spelling error</h4></li>
                                    <li><h4>Internet may be slow</h4></li>
                                </ul>
                            </div>
                            :
                            (
                                <div className="search-page__inner">
                                    {


                                        searchItems.map(item =>
                                            item.poster_path
                                                ?
                                                <SearchComponent
                                                    key={item.id}
                                                    item={item}
                                                    image={baseImgUrl + item.poster_path}
                                                    handleItemExpand={BackdropHandler}
                                                    HandlePlay={playHandler}
                                                    title={item.title} /> : null
                                        )



                                    }
                                </div>
                            )
                    }

                </div>
            </div>
        </div>
    )
}

export default Search
