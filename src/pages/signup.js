import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Form from '../components/form/form.component';
import { FooterContainer } from '../containers/footer'
import HeaderContainer from '../containers/header'
import { FirebaseContext } from '../context/firebase';

const Signup = () => {

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [error, setError] = useState('');

    const isInvalid = firstname == '' || email == '' || password == '';
    const handleSignup = (event) => {
        event.preventDefault();


        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                result.user
                    .updateProfile({
                        displayName: firstname,
                        photoURL: Math.floor(Math.random() * 5) + 1
                    })
                    .then(() => {
                        history.push('/signin')
                    })


            })
            .catch((error) => {
                setEmail('');
                setPassword('');
                setFirstName('');
                setError(error.message);
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
                        <Form.Submit disabled={isInvalid} type="submit">Sign up</Form.Submit>

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
