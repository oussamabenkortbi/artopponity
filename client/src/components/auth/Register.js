import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Button from '@material-ui/core/Button';
import Dropdown from 'react-dropdown';
import { Deciplines } from '../layout/Types';

const type = [ 
  'Artist', 'Client', 'Manager', 'Studio', "Ecole d'art"
];

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
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      // const { user } = nextProps.auth;
      // const link = "/p/" + user.id;
      window.location.href("/EditProfile")
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onDropChange = e => {
    this.setState({ type: e.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      number: this.state.phone,
      type: "Artist",
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div 
        className="Main-Text" 
        style={{
          maxHeight: "100%", 
          backgroundColor: "#fbcf36", 
          width: 'auto'
        }}
      >
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="col s12">
              <br/>
              <br/>
              <br/>
              <h4>
                <b>Inscrivez</b> Vous
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div>
                <Dropdown 
                  name="type"
                  error={errors.type}
                  options={type}
                  onChange={this.onDropChange}
                  placeholder="Type de Compte"
                />
              </div>
              <br/>
              <div>
                <Dropdown 
                  name="Type"
                  error={errors.Type}
                  options={Deciplines}
                  onChange={this.onDropChange}
                  placeholder="Decipline Artistique"
                />
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label style={{ color: '#191919' }} htmlFor="name">Full Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  error={errors.phone}
                  id="phone"
                  type="number"
                  className={classnames("", {
                    invalid: errors.phone
                  })}
                />
                <label style={{ color: '#191919' }} htmlFor="phone">Numéro de telephone</label>
                <span className="red-text">{errors.phone}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label style={{ color: '#191919' }} htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label style={{ color: '#191919' }} htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label style={{ color: '#191919' }} htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12">
                <br/>
                <Button variant="contained" type="submit" style={{ backgroundColor: '#191919', color: '#fbcf36', padding: '20px' }}>
                  Inscrire
                </Button>
                <br/>
                <br/>
                <br/>
              </div>
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
