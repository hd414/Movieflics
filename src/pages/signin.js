import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Form from '../components/form/form.component';
import { FooterContainer } from '../containers/footer'
import HeaderContainer from '../containers/header'
import { FirebaseContext } from '../context/firebase';
import { ProfileContext } from '../context/profile.context';

const Signin = () => {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);
    const { showProfile, setShowProfile, loading, setLoading } = useContext(ProfileContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = password == '' || email == '';
    const handleSignin = (event) => {
        event.preventDefault();


        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                setShowProfile(true);
                setLoading(true);
                history.push('/browse');
            })
            .catch((error) => {
                setEmail('');
                setPassword('');
                setError(error.message);
            });

    };

    return (
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>Sign In</Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}
                    <Form.Base onSubmit={handleSignin} method="post">
                        <Form.Input
                            placeholder="Email Address"
                            value={email}
                            type="email"
                            onChange={({ target }) => setEmail(target.value)}
                        />
                        <Form.Input
                            placeholder="Password"
                            value={password}
                            type="password"
                            onChange={({ target }) => setPassword(target.value)}
                            autoComplete="off"
                        />
                        <Form.Submit disabled={isInvalid} type="submit">Sign In</Form.Submit>

                    </Form.Base>

                    <Form.Text>
                        New to Netflix? <Form.Link to="/signup">Sign up now.</Form.Link>
                    </Form.Text>
                    <Form.TextSmall>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
          </Form.TextSmall>
                </Form>
            </HeaderContainer>
            <FooterContainer />
        </>
    )
}

export default Signin
