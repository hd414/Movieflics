import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../../context/firebase'
import ProfileContainer from '../profile';
import Loading from '../../components/loading/loading.component';
import Header from '../../components/Header/Header.component';
import logo from '../../logo.svg';
import Card from '../../components/card/card.component';
import Banner from '../../components/banner/banner.component';

const BrowseContainer = ({ slides }) => {
    let newSlides = { ...slides };
    console.log('slides', slides);
    const { firebase } = useContext(FirebaseContext);

    const user = firebase.auth().currentUser || {};

    const [profile, setProfile] = useState({});
    const [loading, setloading] = useState(true);
    const [category, setCategory] = useState('Series');
    const [searchTerm, setSearchTerm] = useState('');
    const [slideRows, setSlideRows] = useState([]);


    useEffect(() => {
        console.log("user", profile)
        setTimeout(() => {
            setloading(false);
        }, 3000)
    }, [profile.displayName]);



    useEffect(() => {
        if (slides)
            setSlideRows(slides[category]);
    }, [slides, category]);



    return (
        <div>
            {
                profile.displayName ?
                    (<>
                        {
                            loading ?
                                (<Loading src={user.photoURL} />) : <Loading.ReleaseBody />
                        }
                        <Header src="joker1" dontShowOnSmallViewPort>
                            <Header.Frame>
                                <Header.Group>
                                    <Header.Logo to='/' src={logo} alt="Netflix" />
                                    <Header.TextLink active={category === 'Series' ? 'true' : 'false'} onClick={() => setCategory('Series')}>
                                        Series
                        </Header.TextLink>
                                    <Header.TextLink active={category === 'Films' ? 'true' : 'false'} onClick={() => setCategory('Films')}>
                                        Films
                        </Header.TextLink>
                                </Header.Group>
                                <Header.Group>
                                    <Header.Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                                    <Header.Profile>
                                        <Header.Picture src={user.photoURL} />
                                        <Header.Dropdown>
                                            <Header.Group>
                                                <Header.Picture src={user.photoURL} />
                                                <Header.TextLink>{user.displayName}</Header.TextLink>
                                            </Header.Group>
                                            <Header.Group>
                                                <Header.TextLink onClick={() => firebase.auth().signOut()}>Sign out</Header.TextLink>
                                            </Header.Group>
                                        </Header.Dropdown>
                                    </Header.Profile>
                                </Header.Group>
                            </Header.Frame>

                            <Header.Feature>
                                <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
                                <Header.Text>
                                    Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham
                                    City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a
                                    futile attempt to feel like he's part of the world around him.
                    </Header.Text>
                                <Header.PlayButton>Play</Header.PlayButton>
                                <Banner />
                            </Header.Feature>
                        </Header>

                        <Card.Group>
                            {slideRows.map((slideItem) => (
                                <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
                                    <Card.Title>{slideItem.title}</Card.Title>
                                    <Card.Entities>
                                        {slideItem.data.map((item) => (
                                            <Card.Item key={item.docId} item={item}>
                                                <Card.Image src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`} />
                                                <Card.Meta>
                                                    <Card.SubTitle>{item.title}</Card.SubTitle>
                                                    <Card.Text>{item.description}</Card.Text>
                                                </Card.Meta>
                                            </Card.Item>
                                        ))}
                                    </Card.Entities>
                                    {/* <Card.Feature category={category}>
                                        <Player>
                                            <Player.Button />
                                            <Player.Video src="/videos/bunny.mp4" />
                                        </Player>
                                    </Card.Feature> */}
                                </Card>
                            ))}
                        </Card.Group>
                       )
                    </>
                    )
                    : (<ProfileContainer user={user} setProfile={setProfile} />)
            }

        </div>
    )
}

export default BrowseContainer
