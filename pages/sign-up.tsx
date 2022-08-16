import { AuthError, createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

const LoginPage: NextPage = () => {

  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('')
  const router = useRouter()
  const [alertText, setAlertText] = useState('')

  const signUp = () => {
    //Validation
    if (emailInput === '' || !emailInput.includes('@')) {
      setAlertText('Unable to create account. Please provide a valid email.')
      return
    }
    if (passwordInput === '') {
      setAlertText('Unable to create account. Please provide a password.')
      return
    }
    if (passwordInput.length < 6) {
      setAlertText('Unable to create account. Your password must be at least 6 characters.')
      return
    }
    if (confirmPasswordInput === '') {
      setAlertText('Unable to create account. Please confirm your password.')
      return
    }
    if (passwordInput !== confirmPasswordInput) {
      setAlertText('Unable to create account. Your passwords do not match.')
      return
    }

    createUserWithEmailAndPassword(getAuth(), emailInput, passwordInput)
      .then((userCredential) => {
        router.push('/')
      })
      .catch((error: AuthError) => {
        console.log(error)   
        if (error.code === 'auth/email-already-in-use') {
          setAlertText('Unable to create account. An account with that email already exists.')
        }
      });
  }

  return (
    <div className="d-flex mt-5 flex-column align-items-center">
      <div className="mt-4"></div>
      <div className="mt-5 col-6 text-center">
        <h1 className="my-5">Sign Up</h1>
        <Form.Control className="mb-4" type="email" placeholder="Email" value={emailInput}
          onChange={(e) => { setEmailInput(e.currentTarget.value) }} />
        <Form.Control className="mb-4" type="password" placeholder="Password" value={passwordInput}
          onChange={(e) => { setPasswordInput(e.currentTarget.value) }} />
        <Form.Control className="mb-4" type="password" placeholder="Confirm Password" value={confirmPasswordInput}
          onChange={(e) => { setConfirmPasswordInput(e.currentTarget.value) }} />
        <Button className="col-3 mb-4" onClick={signUp}>Sign Up</Button>
        {alertText !== '' &&
          <Alert variant="danger">{alertText}</Alert>
        }
      </div>
    </div>
  )
}

export default LoginPage