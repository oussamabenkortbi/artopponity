import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updatePassword , logoutUser } from "../../../actions/authActions";
import classnames from "classnames";
import Button from '@material-ui/core/Button';

class ChangePassword extends Component {

    constructor() {
        super();
        this.state = {
            oldpassword: "",
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
        const updater = {
            _id: user.id, 
            oldPassword: this.state.oldpassword,
            password: this.state.password,
            password2: this.state.password2,
        };
        this.props.updatePassword(updater, this.props.history);
    };

    render() {
        
        const { errors } = this.state;
        return (
            <div className="container-fluid center" style={{ maxWidth: '700px', paddingTop: '20px' }}>
                <form noValidate onSubmit={this.onSubmit}>
                    <h4><b>Modifé mot du pass </b></h4>
                    <div className="input-field">
                        <input
                            onChange={this.onChange}
                            error={errors.oldpassword}
                            id="oldpassword"
                            type="password"
                            className={classnames("", {
                                invalid: errors.oldpassword
                            })}
                        />
                        <label htmlFor="password" style={{ color: '#191919' }}>Old Password</label>
                        <span className="red-text">{errors.oldpassword}</span>
                    </div>
                    <div className="input-field">
                        <input
                            onChange={this.onChange}
                            error={errors.password}
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
                            onChange={this.onChange}
                            error={errors.password2}
                            id="password2"
                            type="password"
                            className={classnames("", {
                                invalid: errors.password2
                            })}
                        />
                        <label htmlFor="password2" style={{ color: '#191919' }}>Confirm Password</label>
                        <span className="red-text">{errors.password2}</span>
                    </div>
                    <Button type="submit" variant="contained" onClick={this.onChange5} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                        Enregistrer
                    </Button>
                </form>
            </div>
        );
    }
}

ChangePassword.propTypes = {
    updatePassword: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
     auth: state.auth,
     errors: state.errors
});

export default connect(
    mapStateToProps,
    { logoutUser, updatePassword }
)(withRouter(ChangePassword));