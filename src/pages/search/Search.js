import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/navbar.component'
import SearchComponent from '../../components/Search/search.component';
import { SearchContext } from '../../context/search.context';
import axios from '../../axios';
import './search.scss'
import Modal from '../../components/modal/modal.component';
import ModalDetails from '../../components/modal/modalDetails.component';


const Search = () => {

    const API_KEY = 'cd53523310f1c138c91a1e2e2b1101f3';
    const baseImgUrl = 'https://image.tmdb.org/t/p/original/';
    const { searchQuery, setSearchQuery } = useContext(SearchContext);
    console.log("search -> ", searchQuery);

    const [searchItems, setSearchItems] = useState([]);

    console.log("searchQuery - ", searchQuery);

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
        async function changeQuery() {
            let value = searchQuery.split(" ").join("%20");
            console.log("value ", searchQuery);
            const url = `/search/multi?api_key=${API_KEY}&language=en-US&query=${value}&page=1&include_adult=false`;
            const request = await axios.get(url);
            setSearchItems(request.data.results);
            console.log('Search items -> ', request.data.results);
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
                        <ModalDetails movie={movie} playNow={play} />
                    </Modal>
                )
            }



            <div className="search-page">
                <h1></h1>
                <h1 className="search-page__title">Search Results</h1>
                <div className="search-page__outer">
                    <div className="search-page__inner">
                        {searchItems.map(item =>
                            item.poster_path
                                ?
                                <SearchComponent
                                    key={item.id}
                                    item={item}
                                    image={baseImgUrl + item.poster_path}
                                    handleItemExpand={BackdropHandler}
                                    HandlePlay={playHandler}
                                    title={item.title} /> : null
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search
