import { AuthError, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

const LoginPage: NextPage = () => {

  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const router = useRouter()
  const [alertText, setAlertText] = useState('')

  const login = () => {
    //Validation
    if (emailInput === '' || !emailInput.includes('@')) {
      setAlertText('Unable to sign in. Please provide a valid email.')
      return
    }
    if (passwordInput === '') {
      setAlertText('Unable to sign in. Please provide a password.')
      return
    }

    signInWithEmailAndPassword(getAuth(), emailInput, passwordInput)
      .then(() => {
        router.push('/')
      })
      .catch((error: AuthError) => {
        if (error.code === 'auth/invalid-email') {
          setAlertText('Unable to sign in. Please provide a valid email.')
        } else if (error.code === 'auth/user-not-found') {
          setAlertText('Unable to sign in. User not found.')
        } else if (error.code === 'auth/wrong-password') {
          setAlertText('Unable to sign in. Incorrect password.')
        } else {
          setAlertText('An error has occurred while signing in. Please try again later.')
        }
      });
  }

  return (
    <div className="d-flex mt-5 flex-column align-items-center">
      <div className="mt-4"></div>
      <div className="mt-5 col-6 text-center">
        <h1 className="my-5">Login</h1>
        <Form.Control className="mb-4" type="email" placeholder="Email" value={emailInput}
          onChange={(e) => { setEmailInput(e.currentTarget.value) }} />
        <Form.Control className="mb-4" type="password" placeholder="Password" value={passwordInput}
          onChange={(e) => { setPasswordInput(e.currentTarget.value) }} />
        <Button className="col-3 mb-4" onClick={login}>Login</Button>
        {alertText !== '' &&
          <Alert variant="danger">{ alertText }</Alert>
        }
      </div>
    </div>
  )
}

export default LoginPage