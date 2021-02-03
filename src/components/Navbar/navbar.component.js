import React, { useContext, useEffect, useState } from 'react'
import logo from '../../logo.svg';
import { FirebaseContext } from '../../context/firebase';
import './navbar.styles.css';
import { Picture, Dropdown, Link, Group, Profile, Search, SearchIcon, SearchInput } from './navbar.style';



const Navbar = () => {




    const { firebase } = useContext(FirebaseContext);

    const user = firebase.auth().currentUser || {};
    console.log("user--->", user);

    const [profile, setProfile] = useState({});
    const [loading, setloading] = useState(true);
    const [show, handleShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    function rem() {

    }

    useEffect(() => {
        console.log("user", profile)
        setTimeout(() => {
            setloading(false);
        }, 3000)
    }, [profile.displayName]);



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
        <div className={`nav ${show && 'nav_black'}`}>
            <img
                className="nav_logo"
                src={logo}
                alt="netflix logo"
            />
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

    return (
        <Search {...restProps}>
            <SearchIcon onClick={() => setSearchActive((searchActive) => !searchActive)} data-testid="search-click">
                <img src="/images/icons/search.png" alt="Search" />
            </SearchIcon>
            <SearchInput
                value={searchTerm}
                onChange={({ target }) => setSearchTerm(target.value)}
                placeholder="Search films and series"
                active={searchActive}
                data-testid="search-input"
            />
        </Search>
    );
};
