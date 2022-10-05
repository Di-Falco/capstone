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
      })
      .catch((error) => {
        setSignUpSuccess(`Error: ${error.message}`)
      });
  }

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signInEmail.value;
    const password = event.target.signInPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`Welcome: ${userCredential.user.email}`);
      })
      .catch((error) => {
        setSignInSuccess(`Error: ${error.message}`);
      })
  }

  function doSignOut() {
    signOut(auth)
      .then(function(userCredential) {
        setSignOutSuccess(`${userCredential.user.email} Signed out`);
      })
      .catch(function(error) {
        setSignOutSuccess(`Error: ${error.message}`)
      });
  }

  return(
    <React.Fragment>
      <Header />
      <Container className="account">
      <Row>
      <Col sm={6}>
      <h1>Accout Set Up</h1>
      <p>{signUpSuccess}</p>
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
        <p>{signInSuccess}</p>
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