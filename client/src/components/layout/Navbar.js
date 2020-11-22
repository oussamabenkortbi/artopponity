import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Logo from "../../components/images/logo.svg"
import { Navbar, Nav } from 'react-bootstrap';
import Hidden from '@material-ui/core/Hidden';

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
        <div>
          <Hidden smUp implementation="css"> 
            <Navbar collapseOnSelect expand="true" className="nav" sticky="top">
              <Navbar.Brand href="/" className="logo"><img src={Logo} alt="BRANCHINY" height="40px" /></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav style={{ backgroundColor: '#fbcf36', borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                  <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-between' }}>
                    <Link to="/login" style={{ color: '#191919', margin: '20px 20px', textDecoration: 'none' }}><h5>Connexion</h5></Link>
                    <Link to="/register" style={{ color: '#191919', margin: '20px 20px', textDecoration: 'none' }}><h5>s'inscrire</h5></Link>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Hidden>
          <Hidden xsDown implementation="css"> 
            <Navbar collapseOnSelect className="nav" sticky="top">
              <Navbar.Brand href="/" className="logo"><img src={Logo} alt="BRANCHINY" height="40px" /></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav >
                  <Link to="/login" style={{ color: '#191919', paddingLeft: '15px', paddingTop: '5px', textDecoration: 'none' }}><h5>Connexion</h5></Link>
                  <Link to="/register" style={{ color: '#191919', paddingLeft: '15px', paddingTop: '5px', textDecoration: 'none' }}><h5>s'inscrire</h5></Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Hidden>
        </div>
      );
    } else if (this.props.auth.isAuthenticated === true) {
      const { user } = this.props.auth;
      const link = "/p/" + user.id;
      return (
        <div>
          <Hidden smUp implementation="css">
            <Navbar collapseOnSelect expand="true" className="nav" sticky="top">
              <Navbar.Brand href={link} className="logo"><img src={Logo} alt="BRANCHINY" height="40px"/></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav style={{ backgroundColor: '#fbcf36', borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                  <div style={{ display: 'flex', textAlign: 'center', justifyContent: 'space-between' }}>
                    <a href={link} style={{ color: '#191919', margin: '0px 20px', padding: '10px 0px' }}><BsFillPersonFill className="react-icons-navbar"/></a>
                    <a href="/EditProfile" style={{ color: '#191919', margin: '0px 20px', padding: '10px 0px' }}><GoSettings className="react-icons-navbar"/></a>
                    <p onClick={this.onLogoutClick} style={{ color: '#191919', margin: '0px 20px', padding: '10px 0px' }}><BiLogOut className="react-icons-navbar"/></p>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Hidden>
          <Hidden xsDown implementation="xs">
            <Navbar collapseOnSelect className="nav" sticky="top">
              <Navbar.Brand href={link} className="logo"><img src={Logo} alt="BRANCHINY" height="40px"/></Navbar.Brand>
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
          </Hidden>
        </div>
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
