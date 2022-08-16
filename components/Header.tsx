import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.css'
import { FC } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const Header: FC = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href="/">
          <a className="navbar-brand">My Lists</a>
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
          <Button variant="primary">Login</Button>
          <Button variant="primary" className="ms-4">Sign Up</Button>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;