import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { Deciplines } from '../layout/Types'
import classnames from "classnames";
import Button from '@material-ui/core/Button';

import { Checkbox, FormControlLabel, Menu, MenuItem } from '@material-ui/core';

import DropdownButton from 'react-bootstrap/DropdownButton'

const AccountTypes = [
  'Artist', 'Client', 'Manager', 'Studio', "Ecole d'art"
]

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      phone: 0,
      type: "",
      agree: false,
      errors: {},
      
      anchorEl: null,
      selectedIndex: 0,
      label: "Dicipline Aritstique * ",
      isDiciplineSelected: false,
      
      anchorElAccount: null,
      selectedIndexAccount: 0,
      labelAccount: "Type de compte * ",
      isAccountSelected: false,

      showMessages: false,

    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      const { user } = this.props.auth;
      window.location.href = "/p/" + user.id;
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
      if(nextProps.errors.response) {
        if (nextProps.errors.response.data) {
          this.setState({
            errors: nextProps.errors.response.data
          });
        }
      }
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleChange = e => {
    this.setState({
      agree: e.target.checked
    })
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.isDiciplineSelected === true && this.state.isAccountSelected === true && this.state.agree === true) {
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2,
        phoneNumber: this.state.phone,
        dicipline: this.state.label,
        type: this.state.labelAccount,
      };
      this.props.registerUser(newUser, this.props.history);
    } else this.setState({ showMessages: true })
  };

  handleClickListItem = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuItemClick = (event, index) => {
    this.setState({
      selectedIndex: index,
      label: Deciplines[index],
      anchorEl: null,
      isDiciplineSelected: true,
    })
  };
  
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickListItemAccount = (event) => {
    this.setState({ anchorElAccount: event.currentTarget })
  }

  handleMenuItemClickAccount = (event, index) => {
    this.setState({
      selectedIndexAccount: index,
      labelAccount: AccountTypes[index],
      anchorElAccount: null,
      isAccountSelected: true,
    })
  };
  
  handleCloseAccount = () => {
    this.setState({ anchorElAccount: null });
  };

  render() {
    const { errors } = this.state;
    
    // const success = true;
    
    return (
      <div className="App container" style={{ height: "100%", maxWidth: '500px' }}>
        <div className="row">
          <div className="col">
            <br/>
            <form onSubmit={this.onSubmit}>
              <h3 className="center">
                <b>Inscrivez</b> Vous
              </h3>
              <br/>
              <div className="container">
                <div className="row">
                  <DropdownButton onClick={this.handleClickListItemAccount} id="dropdown-item-button" variant="danger" title={this.state.labelAccount}></DropdownButton>
                  <Menu
                    id="lock-menu-account"
                    anchorEl={this.state.anchorElAccount}
                    keepMounted
                    open={Boolean(this.state.anchorElAccount)}
                    onClose={this.handleCloseAccount}
                  >
                    {AccountTypes.map((option, index) => (
                      <MenuItem
                      key={option}
                      disabled={index === 1 || index === 2 || index === 3 || index === 4}
                      selected={index === this.state.selectedIndexAccount}
                      onClick={(event) => this.handleMenuItemClickAccount(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                  <div className="Button-Padding"><br/></div>
                  <DropdownButton onClick={this.handleClickListItem} id="dropdown-item-button" variant="danger" title={this.state.label}></DropdownButton>
                  <Menu
                    id="lock-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                  >
                    {Deciplines.map((option, index) => (
                      <MenuItem
                      key={option}
                      // disabled={index === 0}
                      selected={index === this.state.selectedIndex}
                      onClick={(event) => this.handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
                { this.state.showMessages === true && (
                  <div>
                    { this.state.isDiciplineSelected === false && 
                      (<span className="red-text">Selectioner un decipline artistique</span>)
                    }
                    <div></div>
                    { this.state.isAccountSelected === false && 
                      (<span className="red-text">Selectioner un type de compte</span>)
                    }
                  </div>
                )}
              </div>
              <div className="Button-Padding"></div>
              <div className="input-field">
                <input
                  required
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label style={{ color: '#191919' }} htmlFor="text">Full Name *</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field">
                <input
                  required
                  onChange={this.onChange}
                  error={errors.phoneNumber}
                  id="phone"
                  type="number"
                  className={classnames("", {
                    invalid: errors.phoneNumber
                  })}
                />
                <label style={{ color: '#191919' }} htmlFor="phone">Numéro de telephone *</label>
                <span className="red-text">{errors.phoneNumber}</span>
              </div>
              <div className="input-field">
                <input
                  required
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label style={{ color: '#191919' }} htmlFor="email">Email *</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field">
                <input
                  required
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label style={{ color: '#191919' }} htmlFor="password">Password *</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field">
                <input
                  required
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label style={{ color: '#191919' }} htmlFor="password2">Confirm Password *</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              { this.state.showMessages === true && (
                <div>
                  { this.state.agree === false && 
                    (<span className="red-text">veuillez accepter</span>)
                  }
                </div>
              )}
              <div>
                <FormControlLabel 
                  control={<Checkbox checked={this.state.agree} onChange={this.handleChange} name="festival" />} 
                  label="J'accpte" style={{ color: '#191919', paddingTop: '6px' }} 
                /><a className="red-text" href="/">les conditions générales * </a>
              </div>
              <div>
                <Button 
                  type="submit"
                  style={{ 
                    width: '100%',
                    border: '2px solid #191919',
                    padding: '10px',
                    borderRadius: '10px',
                    textAlign: 'center',
                    backgroundColor: '#191919',
                    color: '#fbcf36'
                  }}
                  className="hoverable"
                  >S'inscrire
                </Button>
              </div>
              <p style={{ paddingTop: '20px' }} className="center">Vous Avez deja un <a style={{ color: '#ff414e', textDecoration: 'none' }}
                href="/login">compte?</a>
              </p>
              <br/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
