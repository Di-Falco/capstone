import React, { useState } from 'react';
import { auth } from './../../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Container, Form, InputGroup, Button, Col, Row } from "react-bootstrap";
import Header from './../Header';

function Account() {
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpSuccess(`Registration successful: ${userCredential.user.email}`);
        setSignOutSuccess(null);
      })
      .catch((error) => {
        setSignUpSuccess(`Error: ${error.message}`);
        setSignOutSuccess(null);
      });
  }

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signInEmail.value;
    const password = event.target.signInPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`Welcome: ${userCredential.user.email}`);
        setSignOutSuccess(null);
      })
      .catch((error) => {
        setSignInSuccess(`Error: ${error.message}`);
        setSignOutSuccess(null);
      })
  }

  function doSignOut() {
    setSignOutSuccess((auth.currentUser === null ? "not signed in" : `user signed out`));
    signOut(auth)
      .then(function(userCredential) {
        setSignInSuccess(null);
        setSignUpSuccess(null);
      });
  }

  return(
    <React.Fragment>
      <Header />
      <Container className="account">
      <p>{signUpSuccess}</p>
      <p>{signInSuccess}</p>
      <p>{signOutSuccess}</p>
      <Row className="mt-2">
      <Col sm={6}>
      <h1>Accout Set Up</h1>
      <Form onSubmit={doSignUp}>
        <InputGroup className="mb-2">
        <Form.Control 
          type='text'
          name='email'
          placeholder='email' />
        </InputGroup>
        <InputGroup className="mb-2">
        <Form.Control
          type='password'
          name='password'
          placeholder='password' />
        </InputGroup>
        <Button type='submit'>Register</Button>
      </Form>
      </Col>
      <Col sm={6}>
        <h1>Sign In</h1>
        <Form onSubmit={doSignIn}>
          <InputGroup className="mb-2">
            <Form.Control
              type="text"
              name="signInEmail"
              placeholder="email" />
          </InputGroup>
          <InputGroup className="mb-2">
            <Form.Control
              type="password"
              name="signInPassword"
              placeholder="password" />
          </InputGroup>
          <Button type="submit">Sign In</Button>
        </Form>
      </Col>
      </Row>
      <Button onClick={doSignOut}>Sign Out</Button>
      </Container>
    </React.Fragment>
  );
}

export default Account;