import React, { useContext } from 'react'
import Header from '../components/Header/Header.component'
import Profiles from '../components/profiles/profiles.component';
import { ProfileContext } from '../context/profile.context';
import logo from '../logo.svg';

const ProfileContainer = ({ user, setProfile }) => {

    const { showProfile, setShowProfile } = useContext(ProfileContext);
    console.log("showProfile", showProfile);
    const newStyle = {
        zIndex: "1000",
        backgroundColor: "black"
    }



    return (
        <div>
            <Header bg={false}>
                <Header.Frame style={{
                    zIndex: "1000",
                    backgroundColor: "black",
                    position: "relative",
                    margin: "0",
                    padding: "20px"
                }}>
                    <Header.Logo to="/" alt="Netflix" src={logo} />
                </Header.Frame>
            </Header>

            <Profiles >
                <Profiles.Title>Who's Watching</Profiles.Title>
                <Profiles.List>
                    <Profiles.User>
                        <Profiles.Picture onClick={() => {
                            setProfile({ displayName: user.displayName, photoURL: user.photoURL });
                            setShowProfile(false);
                        }} src={user.photoURL} />
                        <Profiles.Name>{user.displayName}</Profiles.Name>
                    </Profiles.User>
                </Profiles.List>
            </Profiles>

        </div >
    )
}

export default ProfileContainer
