import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import Button from '@material-ui/core/Button';
import classnames from "classnames";
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
      window.location.href = "/p/" + user.id;
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      const { user } = nextProps.auth;
      window.location.href = "/p/" + user.id;
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors.response.data
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onLogin = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginUser(userData);
  };

  render() {

    const { errors } = this.state;

    return (
      <div className="container center" style={{ height: '100%', maxWidth: '500px' }}>
        <div className="row">
          <div className="col">
            <form onSubmit={this.onLogin}>
              <br/>
              <h4><b>rejoignez votre communauté artistique professionnelle</b></h4>
              <br/>
              <div className="input-field">
                <input
                  required
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
                  required
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
                <label htmlFor="password" style={{ color: '#191919' }}>Mot de pass</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <Button 
                style={{ 
                  width: '100%',
                  border: '2px solid #191919',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
                className="hoverable"
                type="submit"
                ><b>Connexion</b>
              </Button>
            </form>
            <br/>
            <p style={{ paddingTop: '20px' }}>mot de pass <Link style={{ color: '#ff414e' }}
              to="/ForgotPassword">oublié?</Link>
            </p>
            <Popup/>
          </div>
        </div>
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
