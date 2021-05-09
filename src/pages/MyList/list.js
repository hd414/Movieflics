import React, { useContext, useEffect, useState } from 'react'
import SearchComponent from '../../components/Search/search.component';
import { SearchContext } from '../../context/search.context';
import axios from '../../axios';
import './list.scss'
import Modal from '../../components/modal/modal.component';
import ModalDetails from '../../components/modal/modalDetails.component';
import { FirebaseContext } from '../../context/firebase';




const List = () => {
    // console.log("heelllo");
    const { firebase } = useContext(FirebaseContext);
    const user = firebase.auth().currentUser || {};

    const API_KEY = 'cd53523310f1c138c91a1e2e2b1101f3';
    const baseImgUrl = 'https://image.tmdb.org/t/p/original/';
    // const { searchQuery, setSearchQuery } = useContext(SearchContext);
    // console.log("search -> ", searchQuery);

    const [listItems, setListItems] = useState([]);
    // const [addStatus, setAddStatus] = useState(true);

    // console.log("searchQuery - ", searchQuery);

    const [backdrop, setBackdrop] = useState(false);
    const [play, setplay] = useState(false);
    const [movie, setMovie] = useState('');


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


    useEffect(() => {
        async function getList() {
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

        getList();

    }, [])




    const onRemoveFromList = async (movie) => {
        const db = firebase.firestore();
        try {


            const res = await db.collection('movies').doc(user.uid).update({
                id: firebase.firestore.FieldValue.arrayRemove(movie)
            });

            let data = [];
            data = listItems;
            data = data.filter(film => film.id !== movie.id);
            setListItems(data);
            console.log("data", data);
            console.log(res);
            console.log("remove item");
            onCloseHandler()
        }
        catch (e) {
            console.log(e.message)
        }

    }

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
                        <ModalDetails movie={movie} playNow={play} addToList={onRemoveFromList} added={true} />
                    </Modal>
                )
            }



            <div className="search-page">
                <h1></h1>
                <h1 className="search-page__title">My List</h1>
                <div className="search-page__outer">
                    {
                        listItems?.length === 0 ?
                            <div style={{ color: "white", marginLeft: "0%", lineHeight: "3" }}>
                                <h2>Currently No Item in the List</h2>
                                {/* <ul>
                                    <li><h4>Try different keyword</h4></li>
                                    <li><h4>keyword may have some spelling error</h4></li>
                                    <li><h4>Internet may be slow</h4></li>
                                </ul> */}
                            </div>
                            :
                            (
                                <div className="search-page__inner">
                                    {


                                        listItems.map(item =>
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

export default List
