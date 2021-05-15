import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Form from '../components/form/form.component';
import { FooterContainer } from '../containers/footer'
import HeaderContainer from '../containers/header'
import { FirebaseContext } from '../context/firebase';
import './loader.styles.css';

const Signup = () => {

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [error, setError] = useState('');
    const [loader, setLoader] = useState(false);

    const isInvalid = firstname == '' || email == '' || password == '';
    const handleSignup = (event) => {
        setLoader(true);
        event.preventDefault();


        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                result.user
                    .updateProfile({
                        displayName: firstname,
                        photoURL: Math.floor(Math.random() * 8) + 1
                    })
                    .then(() => {
                        history.push('/signin')
                    })
                setLoader(false);

            })
            .catch((error) => {
                setEmail('');
                setPassword('');
                setFirstName('');
                setError(error.message);
                setLoader(false);
            });

    }
    return (

        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>Sign up</Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}
                    <Form.Base onSubmit={handleSignup} method="post">
                        <Form.Input
                            placeholder="First Name"
                            value={firstname}
                            type="text"
                            onChange={({ target }) => setFirstName(target.value)}
                            autoComplete="off"
                        />
                        <Form.Input
                            placeholder="Email Address"
                            value={email}
                            type="email"
                            onChange={({ target }) => setEmail(target.value)}
                            autoComplete="off"
                        />
                        <Form.Input
                            placeholder="Password"
                            value={password}
                            type="password"
                            onChange={({ target }) => setPassword(target.value)}
                            autoComplete="off"
                        />
                        <Form.Submit style={{ position: "relative" }} className={loader ? "loading" : ""} disabled={isInvalid} type="submit">Sign up
                        {(loader) ? <div id="loading"></div> : null}</Form.Submit>

                    </Form.Base>

                    <Form.Text>
                        already a member? <Form.Link to="/signin">Sign In.</Form.Link>
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

export default Signup
