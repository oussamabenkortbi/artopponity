import React from "react";
import Button from '@material-ui/core/Button';
import axios from "axios";

export default function EditArtistDescription({_id}) {

    const [description, setDescription] = React.useState("");

    React.useEffect(() => {
        const id = {
            _id: _id,
        };
        axios.post("/api/artists/getInfoArtists", id)
            .then(res => {
                setDescription(res.data.artist.description)
            })
            .catch(err => console.log(err));
    },[_id])
    
    const onChange = e => {
        setDescription(e.target.value);
    };

    const onSubmit = e => {
        e.preventDefault();
        const updater = {
            _id: _id, //get artist id
            description: description,
        };
        axios.post("/api/artists/registerArtist", updater)
            .catch(err => console.log(err));
    };

    return (
        <form className="Button-Margin" onSubmit={onSubmit}>
            <label htmlFor="nom" style={{ color: '#191919' }}><b>description</b></label>
            <textarea 
                className="Button-Margin"
                onChange={onChange}
                value={description}
                style={{height: "150px", maxWidth: '100%'}}
                name="description"
                type="textarea"
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
