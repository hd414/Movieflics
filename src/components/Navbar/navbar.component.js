import React, { useContext, useEffect, useState } from 'react'
import logo from '../../movieflics.svg';
import { FirebaseContext } from '../../context/firebase';
import './navbar.styles.css';
import { Picture, Dropdown, Link, Group, Profile, Search, SearchIcon, SearchInput } from './navbar.style';
import { useHistory } from "react-router-dom";

import { useLocation } from 'react-router-dom';
import { SearchContext } from '../../context/search.context';
import { Link as RouteLink } from 'react-router-dom';


const Navbar = ({ }) => {

    const { searchQuery, setSearchQuery } = useContext(SearchContext);

    const location = useLocation();

    const history = useHistory();

    const { firebase } = useContext(FirebaseContext);

    const user = firebase.auth().currentUser || {};


    const [profile, setProfile] = useState({});
    const [loading, setloading] = useState(true);
    const [show, handleShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');



    if (searchTerm?.length > 0 && location.pathname !== '/ResultPage') {
        history.push('/ResultPage');
    }
    else if (searchTerm?.length === 0 && location.pathname === '/ResultPage') {
        history.push('/browse');
    }


    function rem() {

    }

    useEffect(() => {
        setTimeout(() => {
            setloading(false);
        }, 3000)
    }, [profile.displayName]);



    useEffect(() => {
        setSearchQuery(searchTerm);
    }, [searchTerm]);


    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                handleShow(true);
            }
            else {
                handleShow(false);
            }
        })

        return () => {
            window.removeEventListener('scroll', rem);
        }

    }, []);


    const navLink = {
        color: "#fff"
    }

    let browsePage = false, tvShowPage = false, listPage = false;
    let path = location.pathname;
    if (path === '/browse') {
        browsePage = true;
    }
    else if (path === '/tvShows') {
        tvShowPage = true;
    }
    else if (path === '/ListPage') {
        listPage = true;
    }

    return (
        <div id="navbar" className={`nav ${show && 'nav_black'}`}>
            <RouteLink to="/browse" onClick={() => setSearchTerm('')}>
                <img
                    className="nav_logo"
                    src={logo}
                    alt="movieflics logo"
                />
            </RouteLink>
            <div style={{
                display: 'flex',
                width: "88%"
            }}>
                <div style={{ display: "block" }} className={`nav_routes ${show && 'nav_black'}`}>
                    <RouteLink className="nav_route"
                        style={{ color: browsePage ? "#fff" : null }}
                        to="/browse" onClick={() => setSearchTerm('')}>
                        Movies
                   </RouteLink>
                    <RouteLink className="nav_route ${show && 'nav_black'}`"
                        style={{ color: listPage ? "#fff" : null }}
                        to="/ListPage" onClick={() => setSearchTerm('')}>
                        My List
                   </RouteLink>
                    <RouteLink className="nav_route ${show && 'nav_black'}`"
                        style={{ color: tvShowPage ? "#fff" : null }}
                        to="/tvShows" onClick={() => setSearchTerm('')}>
                        Tv Series
                   </RouteLink>

                </div>

                <Navbar.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Profile>

                    <img
                        className="nav_avtaar"
                        src={`/images/users/${user.photoURL}.png`}
                        alt="avtaar"
                    />
                    <Dropdown>
                        <Group>
                            <Picture src={`/images/users/${user.photoURL}.png`} />
                            <Link>{user.displayName}</Link>
                        </Group>
                        <Group>
                            <Link onClick={() => firebase.auth().signOut()}>Sign out</Link>
                        </Group>
                    </Dropdown>
                </Profile>
            </div>

        </div>
    )
}

export default Navbar

Navbar.Search = function NavbarSearch({ searchTerm, setSearchTerm, ...restProps }) {
    const [searchActive, setSearchActive] = useState(false);

    const onChange = e => {
        e.persist();
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        // console.log("Search message inside useEffect: ", searchTerm);
    }, [searchTerm]);

    return (
        <Search {...restProps}>
            <SearchIcon onClick={() => setSearchActive((searchActive) => !searchActive)} data-testid="search-click">
                <img src="/images/icons/search.png" alt="Search" />
            </SearchIcon>
            <SearchInput
                value={searchTerm}
                onChange={onChange}
                placeholder="Search Movies and Series"
                active={searchActive}
                data-testid="search-input"
                autoFocus
            />
        </Search>
    );
};
