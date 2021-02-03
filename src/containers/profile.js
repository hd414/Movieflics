import React from 'react'
import Header from '../components/Header/Header.component'
import Profiles from '../components/profiles/profiles.component';
import logo from '../logo.svg';

const ProfileContainer = ({ user, setProfile }) => {

    return (
        <div>
            <Header bg={false}>
                <Header.Frame>
                    <Header.Logo to="/" alt="Netflix" src={logo} />
                </Header.Frame>
            </Header>

            <Profiles onClick={() => setProfile({ displayName: user.displayName, photoURL: user.photoURL })}>
                <Profiles.Title>Who's Watching</Profiles.Title>
                <Profiles.List>
                    <Profiles.User>
                        <Profiles.Picture src={user.photoURL} />
                        <Profiles.Name>{user.displayName}</Profiles.Name>
                    </Profiles.User>
                </Profiles.List>
            </Profiles>

        </div>
    )
}

export default ProfileContainer
