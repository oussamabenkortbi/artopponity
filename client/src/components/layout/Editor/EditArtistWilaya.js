import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import { Wilaya } from '../Types'
import Dropdown from 'react-dropdown';
import Button from '@material-ui/core/Button';
import axios from "axios";

class EditProfile extends Component {

    constructor() {
        super();
        this.state = {
            wilaya: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const { user } = this.props.auth;
        const id = {
          _id: user.id,
        };
        axios.post("/api/artists/getInfoArtists", id)
            .then(res => {
                    this.setState({
                        wilaya: res.data.artist.wilaya,
                    })
                })
                .catch(err =>
                    console.log(err)
                )
            ;
    }
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onWilayaChange = e => {
        this.setState({ wilaya: e.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { user } = this.props.auth;
        const updater = {
            _id: user.id, //get artist id
            wilaya: this.state.wilaya,
        };
        axios.post("/api/artists/registerArtist", updater)
            .catch(err => console.log(err));
    };

    render() {
        const { errors } = this.state;
        return (
            <form className="Button-Margin" onSubmit={this.onSubmit}>
                <label htmlFor="nom" style={{ color: '#191919' }}><b>Wilaya</b></label>
                <span className="red-text">{errors.wilaya}</span>
                <Dropdown 
                    name="wilaya"
                    className="Button-Margin"
                    error={errors.wilaya}
                    options={Wilaya}
                    value={this.state.wilaya}
                    onChange={this.onWilayaChange}
                    placeholder="wilaya"
                    style={{ color: '#191919' }}
                />
                <Button 
                    variant="contained" 
                    type="submit" 
                    style={{ 
                        backgroundColor: '#191919', 
                        color: '#fbcf36', 
                        marginLeft: '15px' 
                    }}
                    >
                    Modifé
                </Button>
            </form>
        );
    }
}

EditProfile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
     auth: state.auth,
     errors: state.errors
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(withRouter(EditProfile));