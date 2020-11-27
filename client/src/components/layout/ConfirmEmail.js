import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { confirmUser } from "../../actions/authActions";

class ConfirmEmail extends Component {
    constructor() {
        super();
        this.state = {
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

    onSend = (e) => {
        e.preventDefault();
        const { user } = this.props.auth;
        const userdata = {
            _id: user.id,
            email: user.email
        }
        this.props.confirmUser(userdata);
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="container center" style={{ height: '100vh', paddingTop: '10vh', maxWidth: '700px' }}>
                <div className="row">
                    <div className="col">
                        <form onSubmit={this.onSend}>
                            <h2><b>Inscription effectuée avec succés</b></h2>
                            <br/>
                            <h5><b>Confirmez Votre Email</b></h5>
                            <br/>
                            <p>si vous ne trouvez pas le mail de confirmation sur votre boîte de réception, veuillez vérifier la section spam</p>
                            <span className="red-text">
                                {errors.email}
                            </span>
                            <br/>
                            <div style={{ marginTop: '20px' }}></div>
                            <button 
                                className="btn btn-large black" 
                                style={{ color: '#fbcf36' }} 
                                type="submit"
                            >Envoyer encore
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

ConfirmEmail.propTypes = {
  confirmUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { confirmUser }
)(ConfirmEmail);


        