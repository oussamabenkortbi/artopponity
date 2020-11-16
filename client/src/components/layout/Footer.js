import React from "react";
// import { Link } from "react-router-dom";
import Logo from "../../components/images/logo.svg"
import { Navbar, Nav } from 'react-bootstrap';

export default function Footer() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="footer" fixed="bottom">
          <Navbar.Brand href="/" className="logo"><img src={Logo} alt="BRANCHINY" height="45px" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            
          </Nav>
          <Nav >
            <img src={Logo} alt="BRANCHINY" height="45px" />
          </Nav>
          </Navbar.Collapse>
      </Navbar>
    </div>
  )
}