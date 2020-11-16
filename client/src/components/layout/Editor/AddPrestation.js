import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import axios from "axios";

class EditPrestation extends Component {

    constructor() {
        super();
        this.state = {
            name: "",
            time: "",
            price: "",
            artists: 0,
            space: "",
            prepareTime: "",
            description: "",
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    }
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { user } = this.props.auth;
        const prestation = {
            _id: user.id,
            name: this.state.name,
            time: this.state.time,
            price: this.state.price,
            artists: this.state.artists,
            space: this.state.space,
            prepareTime: this.state.prepareTime,
            description: this.state.description,
        }
        axios.post("/api/prestations/add", prestation)
            .then(() => {
                window.location.reload();
            })
            .catch(err => { console.log(err) });
    };

    render() {
       
        const { errors } = this.state;
        return (
            <div className="container" style={{height: "100%", backgroundColor: "#fbcf36" }}>
                <br/>
                <div>
                    <label htmlFor="text" style={{ color: '#191919' }}><b>Nom du prestation</b></label>
                    <input 
                        type="text" 
                        onChange={this.onChange} 
                        value={this.state.name} 
                        name="name"
                    />
                </div>
                <div className="Button-Margin">
                    <label htmlFor="text" style={{ color: '#191919' }}><b>Description</b></label>
                    <textarea 
                        onChange={this.onChange}
                        value={this.state.description}
                        error={errors.description}
                        style={{height: "150px"}}
                        name="description"
                        type="textarea"
                    />
                    <span className="red-text">{errors.description}</span>
                </div>
                <div>
                    <br/>
                    <label htmlFor="text" style={{ color: '#191919' }}><b>Temps de prestation (min)</b></label>
                    <input 
                        type="number" 
                        onChange={this.onChange} 
                        value={this.state.fullName} 
                        name="temp"
                    />
                </div>
                <div>
                    <br/>
                    <label htmlFor="text" style={{ color: '#191919' }}><b>Prix en DA</b></label>
                    <input 
                        type="number" 
                        onChange={this.onChange} 
                        value={this.state.fullName} 
                        name="price"
                    />
                </div>
                <div>
                    <br/>
                    <label htmlFor="text" style={{ color: '#191919' }}><b>Nombre d'artist</b></label>
                    <input 
                        type="number" 
                        onChange={this.onChange} 
                        value={this.state.fullName} 
                        name="artists"
                    />
                </div>
                <div>
                    <br/>
                    <label htmlFor="text" style={{ color: '#191919' }}><b>Espace nécessair (M2)</b></label>
                    <input 
                        type="number" 
                        onChange={this.onChange} 
                        value={this.state.fullName} 
                        name="space"
                    />
                </div>
                <div>
                    <br/>
                    <label htmlFor="text" style={{ color: '#191919' }}><b>Temps de preparation (min)</b></label>
                    <input 
                        type="number" 
                        onChange={this.onChange} 
                        value={this.state.fullName} 
                        name="prepareTime"
                    />
                </div>
                <br/>
                <button 
                    onClick={this.onSubmit}
                    style={{ color: '#fbcf36' }}
                    className="btn btn-large waves-effect waves-light hoverable black accent-3"
                    >Enregistrer
                </button>
                <div style={{ paddingButtom: '20px' }}></div>
                <br/>
            </div>
        );
    }
}

EditPrestation.propTypes = {
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
)(withRouter(EditPrestation));