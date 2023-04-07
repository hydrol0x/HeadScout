import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavMenu() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>HeadScout</Navbar.Brand>
          <Nav className="me-auto">
            <LinkContainer to="/data_display">
              <Nav.Link>Data Display</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/test">
              <Nav.Link>Test</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavMenu;