import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import { Grid } from "@material-ui/core";
import Popup from './Popup';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in refresh
    if (this.props.auth.isAuthenticated) {
      const { user } = this.props.auth;
      const link = "/p/" + user.id;
      this.props.history.push(link);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      const { user } = nextProps.auth;
      const link = "/p/" + user.id;
      this.props.history.push(link);
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

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {

    const { errors } = this.state;
    
    return (
      <div>
        <Grid 
          container 
          spacing={2}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs>
            <br/>
            <h4><b>rejoignez votre communauté artistique professionnelle</b></h4>
            <br/>
            <div className="input-field">
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                style={{ color: '#191919' }}
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound
                })}
              />
              <label htmlFor="email" style={{ color: '#191919' }}>Email</label>
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
            <div className="input-field">
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                style={{ color: '#191919' }}
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect
                })}
              />
              <label htmlFor="password" style={{ color: '#191919' }}>Password</label>
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
            <p 
              style={{ 
                border: '2px solid #191919',
                padding: '10px',
                borderRadius: '10px',
                textAlign: 'center',
              }}
              className="hoverable"
              onClick={this.onSubmit}
              >Connexion
            </p>
            <p >mot de pass <Link style={{ color: '#ff414e' }}
              to="/forgetpassword">oublié?</Link>
            </p>
            <Popup/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
