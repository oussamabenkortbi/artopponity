import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import classnames from "classnames";
import { connect } from "react-redux";

class ForgotPasword extends Component {

    constructor() {
        super();
        this.state = {
          email: "",
          errors: {},
          submitted: true
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
        }
        axios.post("/verify/ForgotPassword", user)
            .then(() => {
                window.location.href = "/";
                this.setState({ submitted: true })
            })
            .catch(err => console.log(err));
    }
    render() {

        const { errors } = this.state;

        if (this.state.submitted === false) return (
            <div className="container" style={{ height: '100vh', maxWidth: '400px' }}>
                <div className="row">
                    <div className="col">
                        <form onSubmit={this.onSubmit} style={{ paddingTop: '10vh' }}>
                            <h2>Mot de pass oublié</h2>
                            <div className="input-field">
                                <label htmlFor="email" style={{ color: '#191919' }}>Email</label>
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
                                <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                            </div>
                            <Button 
                                style={{ 
                                    width: '100%',
                                    border: '2px solid #191919',
                                    borderRadius: '10px',
                                    textAlign: 'center',
                                    maxWidth: '150px'
                                }}
                                className="hoverable"
                                type="submit"
                                ><b>Submit</b>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        )
        return (
            <div className="container center" style={{ height: '100vh', paddingTop: '10vh' }}>
                <h2>lien de récupération a ete envoyé a votre email</h2>
            </div>
        )
    }
}

ForgotPasword.propTypes = {
    // loginUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { }
  )(ForgotPasword);
  
