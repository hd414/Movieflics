import React, { createContext, useContext, useEffect, useState } from 'react'
import logo from '../../logo.svg';
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


    // const searchContext = createContext(null);
    const history = useHistory();

    const { firebase } = useContext(FirebaseContext);

    const user = firebase.auth().currentUser || {};
    // console.log("user--->", user);

    const [profile, setProfile] = useState({});
    const [loading, setloading] = useState(true);
    const [show, handleShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');



    if (searchTerm?.length > 0 && location.pathname != '/ResultPage') {
        history.push('/ResultPage');
    }
    else if (searchTerm?.length === 0 && location.pathname != '/browse') {
        history.push('/browse');
    }


    function rem() {

    }

    useEffect(() => {
        // console.log("user", profile)
        setTimeout(() => {
            setloading(false);
        }, 3000)
    }, [profile.displayName]);



    useEffect(() => {
        setSearchQuery(searchTerm);
    }, [searchTerm]);





    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 150) {
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



    return (
        <div id="navbar" className={`nav ${show && 'nav_black'}`}>
            <RouteLink to="/browse" onClick={() => setSearchTerm('')}>
                <img
                    className="nav_logo"
                    src={logo}
                    alt="netflix logo"
                />
            </RouteLink>
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
