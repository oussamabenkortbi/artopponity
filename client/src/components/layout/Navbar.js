import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Logo from "../../components/images/logo.svg"
import { Navbar, Nav } from 'react-bootstrap';

import { GoSettings } from "react-icons/go";
import { BsFillPersonFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

class NavbarBranchiny extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location.href = '/';
  };

  render() {
    //if not logged in:
    if (this.props.auth.isAuthenticated === false) {
      return (
        <Navbar collapseOnSelect expand="lg" className="nav" sticky="top">
          <Navbar.Brand href="/" className="logo"><img src={Logo} alt="BRANCHINY" height="45px" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav >
              <Link to="/login" style={{ color: '#191919', paddingLeft: '15px', paddingTop: '5px' }}><h5>Connexion</h5></Link>
              <Link to="/register" style={{ color: '#191919', paddingLeft: '15px', paddingTop: '5px' }}><h5>s'inscrire</h5></Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else if (this.props.auth.isAuthenticated === true) {
      const { user } = this.props.auth;
      const link = "/p/" + user.id;
      return (
        <Navbar collapseOnSelect expand="lg" className="nav" sticky="top">
          <Navbar.Brand href="/" className="logo"><img src={Logo} alt="BRANCHINY" height="45px"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <a href={link} style={{ color: '#191919', paddingLeft: '15px', paddingTop: '10px' }}><BsFillPersonFill className="react-icons-navbar"/></a>
              <a href="/EditProfile" style={{ color: '#191919', paddingLeft: '15px', paddingTop: '10px' }}><GoSettings className="react-icons-navbar"/></a>
              <p onClick={this.onLogoutClick} style={{ color: '#191919', paddingLeft: '15px', paddingTop: '10px' }}><BiLogOut className="react-icons-navbar"/></p>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
}

NavbarBranchiny.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(NavbarBranchiny);
