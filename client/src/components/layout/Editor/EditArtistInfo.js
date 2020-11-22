import React from "react";
import axios from "axios";

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";

import { Deciplines, Wilaya } from '../Types';
import Dropdown from 'react-dropdown';

import { FormLabel, FormControl, FormGroup, FormControlLabel, Checkbox, Button } from '@material-ui/core';

function EditArtistInfo(props) {

    const [description, setDescription] = React.useState("");
    const [decipline, setDecipline] = React.useState("");
    const [wilaya, setWilaya] = React.useState("");
    const [state, setState] = React.useState({
        festival: false,
        fete: false,
        hotel: false,
        proEvent: false,
        animation: false,
        publicEvent: false,
        privateEvent: false,
    });

    React.useEffect(() => {
        const artist = {
            _id: props.auth.user.id,
        };
        axios.post("/api/artists/getInfoArtists", artist)
            .then(res => {
                setDecipline(res.data.artist.dicipline)
                setDescription(res.data.artist.description)
                setWilaya(res.data.artist.wilaya)
                if (res.data.artist.eventType) setState(res.data.artist.eventType)
            })
            .catch(err => console.log(err));
    },[props.auth.user.id])

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.checked });
    };
    
    const onChange = e => {
        setDescription(e.target.value);
    };

    const onWilayaChange = e => {
        setWilaya(e.value);
    };
    const onDeciplineChange = e => {
        setDecipline(e.value);
    };

    const onSubmit = e => {
        e.preventDefault();

        const updater = {
            _id: props.auth.user.id,
            description: description,
            eventType: state,
            wilaya: wilaya
        }

        axios.post("/api/artists/registerArtist", updater)
            .then(() => window.location.reload())
            .catch(err => console.log(err));
    };

    return (
        <div className="container" style={{ paddingTop: '40px' }}>
            <div className="row">
                <div className="col">
                    <form onSubmit={onSubmit}>
                        <div>
                            <FormLabel component="legend" style={{ color: '#191919' }}><b>description</b></FormLabel>
                            <textarea 
                                className="Button-Margin"
                                onChange={onChange}
                                value={description}
                                style={{height: "150px", maxWidth: '100%'}}
                                name="description"
                                type="textarea"
                            />
                        </div>
                        <div>
                            <FormLabel component="legend" style={{ color: '#191919' }}><b>Decipline</b></FormLabel>
                            <Dropdown 
                                name="decipline"
                                className="Button-Margin"
                                // error={errors.decipline}
                                options={Deciplines}
                                value={decipline}
                                onChange={onDeciplineChange}
                                placeholder="Decipline"
                            />
                        </div>
                        <div>
                            <FormLabel component="legend" style={{ color: '#191919' }}><b>Wilaya</b></FormLabel>
                            <Dropdown 
                                name="wilaya"
                                className="Button-Margin"
                                // error={errors.wilaya}
                                options={Wilaya}
                                value={wilaya}
                                onChange={onWilayaChange}
                                placeholder="wilaya"
                                style={{ color: '#191919' }}
                            />
                            {/* <span className="red-text">{errors.wilaya}</span> */}
                        </div>
                        <div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend" style={{ color: '#191919' }}><b>Type d'evènement</b></FormLabel>
                                <FormGroup>
                                    <FormControlLabel 
                                        control={<Checkbox checked={state.festival} onChange={handleChange} name="festival" />}
                                        label="festival" style={{ color: '#191919' }} 
                                    />
                                    <FormControlLabel 
                                        control={<Checkbox checked={state.fete} onChange={handleChange} name="fete" />}
                                        label="fete et mariage" style={{ color: '#191919' }} 
                                    />
                                    <FormControlLabel 
                                        control={<Checkbox checked={state.hotel} onChange={handleChange} name="hotel" />}
                                        label="hotel & restaurant" style={{ color: '#191919' }} 
                                    />
                                    <FormControlLabel 
                                        control={<Checkbox checked={state.proEvent} onChange={handleChange} name="proEvent" />}
                                        label="évènement professionnel" style={{ color: '#191919' }} 
                                    />
                                    <FormControlLabel 
                                        control={<Checkbox checked={state.animation} onChange={handleChange} name="animation" />}
                                        label="animation centre commercial" style={{ color: '#191919' }} 
                                    />
                                    <FormControlLabel 
                                        control={<Checkbox checked={state.publicEvent} onChange={handleChange} name="publicEvent" />}
                                        label="évènement public" style={{ color: '#191919' }} 
                                    />
                                    <FormControlLabel 
                                        control={<Checkbox checked={state.privateEvent} onChange={handleChange} name="privateEvent" />}
                                        label="évènement privé" style={{ color: '#191919' }} 
                                    />
                                </FormGroup>
                            </FormControl>
                        </div>
                        <Button 
                            variant="contained" 
                            type="submit" 
                            style={{ 
                                backgroundColor: '#191919', 
                                color: '#fbcf36', 
                                width: '100px'
                            }}
                            >
                            modifier
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
EditArtistInfo.propTypes = {
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
)(withRouter(EditArtistInfo));