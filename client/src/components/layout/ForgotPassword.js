import React, { Component } from 'react';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import classnames from "classnames";
import { connect } from "react-redux";
import { restorePassword } from "../../actions/authActions";

class ForgotPassword extends Component {

    constructor() {
        super();
        this.state = {
          email: "",
          errors: {},
          submitted: false
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors.response.data
            });
        }
    }
    
    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const usermail = {
            email: this.state.email,
        }
        this.props.restorePassword(usermail)
        this.setState({ submitted: true })
    }
    render() {

        const { errors } = this.state;

        return (
            <div className="container" style={{ height: '100vh', maxWidth: '600px' }}>
                <div className="row">
                    <div className="col">
                        <form onSubmit={this.onSubmit} style={{ paddingTop: '20px' }}>
                            <h3>Mot de pass oublié</h3>
                            { (this.state.submitted === true && this.state.errors === {}) && (
                                <span className="red-text">lien de récupération a ete envoyé a votre address mail</span>
                            )}
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
                                        invalid: errors.email
                                    })}
                                />
                                <span className="red-text">
                                    {errors.email}
                                </span>
                            </div>
                            <Button 
                                variant="contained" 
                                type="submit" 
                                style={{ 
                                    backgroundColor: '#191919', 
                                    color: '#fbcf36' 
                                }}
                            >
                                Valider
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

ForgotPassword.propTypes = {
    // loginUser: PropTypes.func.isRequired,
    restorePassword: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { restorePassword }
  )(ForgotPassword);
  
