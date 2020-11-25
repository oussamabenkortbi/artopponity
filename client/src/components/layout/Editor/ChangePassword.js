import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatePassword } from "../../../actions/authActions";
import Button from '@material-ui/core/Button';
import classnames from "classnames";

class ChangePassword extends Component {
    constructor() {
        super();
        this.state = {
            oldPassword: "",
            password: "",
            password2: "",
            errors: {}
        };
    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors.response.data
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { user } = this.props.auth;
        const userData = {
            _id: user.id, 
            oldPassword: this.state.oldpassword,
            password: this.state.password,
            password2: this.state.password2,
        }
        
        this.props.updatePassword(userData);
    };

    render() {

        const { errors } = this.state;

        return (
            <div className="container-fluid center" style={{ maxWidth: '700px', paddingTop: '20px', height: '100vh' }}>
                <div className="row">
                    <form className="col" onSubmit={this.onSubmit}>
                        <h4><b>modifier mot du pass</b></h4>
                        <div className="input-field">
                            <input
                                required
                                onChange={this.onChange}
                                error={errors.oldpassword}
                                value={this.state.oldpassword}
                                id="oldpassword"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.oldPassword
                                })}
                            />
                            <label htmlFor="password" style={{ color: '#191919' }}>Old Password</label>
                            <span className="red-text">{errors.oldPassword}</span>
                        </div>
                        <div className="input-field">
                            <input
                                required
                                onChange={this.onChange}
                                error={errors.password}
                                value={this.state.password}
                                id="password"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password
                                })}
                            />
                            <label htmlFor="password" style={{ color: '#191919' }}>New Password</label>
                            <span className="red-text">{errors.password}</span>
                        </div>
                        <div className="input-field">
                            <input
                                required
                                onChange={this.onChange}
                                error={errors.password2}
                                value={this.state.password2}
                                id="password2"
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password2
                                })}
                            />
                            <label htmlFor="password2" style={{ color: '#191919' }}>Confirm Password</label>
                        </div>
                        <div style={{ width: '100%' }}>
                            <span className="red-text">{errors.changed}</span>
                        </div>
                        <Button type="submit" variant="contained" style={{ backgroundColor: '#191919', color: '#fbcf36', marginTop: '20px' }}>
                            Enregistrer
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

ChangePassword.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updatePassword }
)(ChangePassword);