import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    image: {
        objectFit: 'cover',
        objectPosition: '50% 0%',
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        width: '100%',
        height: '100%',
    },
}));

export default function EditPhotos({id, type}) {
    
    const classes = useStyles();
    const [ PreviewSource, setPreviewSource ] = useState('');

    const FileInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!PreviewSource) return;
        uploadImage(PreviewSource);
    }

    const uploadImage = async (base64Encoded) => {
        const reqbody = {
            owner: id,
            image: base64Encoded,
            type: type
        }
        axios.post("/api/photos/upload", reqbody)
            .then(res => res.json)
            .catch(err => console.error(err))
    }

    return (
        <div className="App" style={{ padding: '100px'}}>
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        type="file"
                        name="image"
                        onChange={FileInputChange}
                        className="form-input"
                    />
                    <br/>
                    <div style={{ paddingTop: '10px'}}></div>
                    <div className="contain">
                        {/* <div className={classes.image} style={{ backgroundColor: '#191919'}}></div> */}
                        { PreviewSource && (
                            <img src={PreviewSource} alt="pic" className={classes.image} />
                        )}
                    </div>
                    <div style={{ paddingTop: '10px'}}></div>
                    <Button 
                        variant="contained" 
                        type="submit" 
                        style={{ backgroundColor: '#191919', color: '#fbcf36' }}
                    >
                        Enregistrer
                    </Button>
                    <br/>
                </form>
            </div>
        </div>
    )
}