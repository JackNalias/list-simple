import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.css'
import { FC, useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase/Setup";

const Header: FC = () => {
  const router = useRouter()
  const [signedIn, setSignedIn] = useState(false)

  const login = () => {
    router.push('/login')
  }

  const signUp = () => {
    router.push('/sign-up')
  }

  const signOut = () => {
    auth.signOut()
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setSignedIn(true)
    } else {
      setSignedIn(false)
    }
  });

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/">
          <a className="navbar-brand">List Simple</a>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/">
              <a className="nav-link">Home</a>
            </Link>
            <Link href="/my-lists">
              <a className="nav-link">My Lists</a>
            </Link>

          </Nav>
          {!signedIn
            ? <>
              <Button variant="primary" onClick={login}>Login</Button>
              <Button variant="primary" onClick={signUp} className="ms-4">Sign Up</Button>
            </>
            : <Button variant="primary" onClick={signOut} className="ms-4">Sign Out</Button>
          }

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;