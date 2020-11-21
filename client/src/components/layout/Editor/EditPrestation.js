import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import Button from '@material-ui/core/Button';
import axios from 'axios';

class EditPrestations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            time: "",
            price: 0,
            artists: 0,
            space: "",
            prepareTime: "",
        };
    }

    componentDidMount() {
        const { prestation } = this.props;
        this.setState({
            _id: prestation._id,
            name: prestation.name,
            description: prestation.description,
            time: prestation.time,
            price: prestation.price,
            artists: prestation.artists,
            space: prestation.space,
            prepareTime: prestation.prepareTime,
        })
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

    onClick = e => {
        e.preventDefault();
        const updater = {
            _id: this.state._id,
            name: this.state.name,
            description: this.state.description,
            time: this.state.time,
            price: this.state.price,
            artists: this.state.artists,
            space: this.state.space,
            prepareTime: this.state.prepareTime,
        }
        axios.post("/api/prestations/update", updater)
            .then(() => window.location.reload())
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="App" style={{height: "100%", padding: '50px'}}>
                <form onSubmit={this.onClick}>
                    <div>
                        <label htmlFor="name" style={{ color: '#191919' }}>Nom du prestation</label>
                        <input 
                            onChange={this.onChange}
                            type="text" 
                            value={this.state.name} 
                            name="name"
                            required
                        />
                    </div>
                    <div className="Button-Margin">
                        <label htmlFor="description" style={{ color: '#191919' }}>Description</label>
                        <textarea 
                            onChange={this.onChange}
                            type="textarea"
                            value={this.state.description}
                            style={{height: "150px"}}
                            name="description"
                        />
                    </div>
                    <div>
                        <label htmlFor="time" style={{ color: '#191919' }}>Durée de la prestation (min)</label>
                        <input 
                            onChange={this.onChange}
                            type="number" 
                            value={this.state.time} 
                            name="time"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price" style={{ color: '#191919' }}>Prix en DA</label>
                        <input 
                            onChange={this.onChange}
                            type="number" 
                            value={this.state.price} 
                            name="price"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="artists" style={{ color: '#191919' }}>Nombre d'artist</label>
                        <input 
                            onChange={this.onChange}
                            type="number" 
                            value={this.state.artists} 
                            name="artists"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="space" style={{ color: '#191919' }}>Espace nécessair (Mettre Carreé)</label>
                        <input 
                            onChange={this.onChange}
                            type="number" 
                            value={this.state.space} 
                            name="space"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="prepareTime" style={{ color: '#191919' }}>Temps de preparation (min)</label>
                        <input 
                            onChange={this.onChange}
                            type="number" 
                            value={this.state.prepareTime} 
                            name="prepareTime"
                            required
                        />
                    </div>
                    <br/>
                    <Button type="submit" style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                        Enregistrer
                    </Button>
                </form>
            </div>
        );
    }
}

EditPrestations.propTypes = {
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
)(withRouter(EditPrestations));

                

                