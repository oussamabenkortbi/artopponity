import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from "axios";
import Button from '@material-ui/core/Button';

export default function CheckboxesGroup({ id }) {

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
        const getter = {
            _id: id,
        }
        axios.post("/api/artists/getEventType", getter)
            .then( res => {
                if(res.data.eventType) {
                    setState(res.data.eventType)
                }
            })
            .catch(err => console.log(err))
    }, [id]);

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.checked });
    };

    const handelSubmit = () => {
        const updater = {
            _id: id,
            eventType: state
        }
        axios.post("/api/artists/updateEventType", updater)
            .catch(err => console.log(err))
    }

    return (
        <div>
            <FormControl component="fieldset">
                <FormLabel component="legend" style={{ color: '#191919' }}><b>Type d'évènement</b></FormLabel>
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
                <Button onClick={handelSubmit} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                    save
                </Button>
            </FormControl>
        </div>
    );
}

