import React from 'react'
import Header from '../components/Header/Header.component';
import logo from '../logo.svg';


const HeaderContainer = ({ children }) => {
    return (
        <Header>
            <Header.Frame>
                <Header.Logo to="/" alt="Netflix" src={logo} />
                <Header.ButtonLink to="/signin" >Signin</Header.ButtonLink>
            </Header.Frame>
            {children}
        </Header>
    )
}

export default HeaderContainer
