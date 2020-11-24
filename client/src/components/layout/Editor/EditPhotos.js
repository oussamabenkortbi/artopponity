import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios'

const useStyles = makeStyles(() => ({
    paper: {
        width: '100%',
        backgroundColor: '#fbcf36',
        color: '#191919'
    },
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

export default function EditPhotos({id, type, photo}) {
    
    const classes = useStyles();
    const [ PreviewSource, setPreviewSource ] = useState('');
    const [ OldPreviewSource, setOldPreviewSource ] = useState('');
    const [ black, setBlack ] = useState(false);
    const [ state, setState ] = useState(0);

    React.useEffect(() => {
        if (photo) setPreviewSource(photo.image)
        else setBlack(true)
    },[photo])

    const FileInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setOldPreviewSource(PreviewSource)
            setPreviewSource(reader.result)
        }
    }

    const onEdit0 = () => {
        setState(0)
        setPreviewSource(OldPreviewSource)
    }
    const onEdit1 = () => {
        setState(1)
    }
    const onEdit2 = () => {
        setState(2)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (!PreviewSource) return;
        uploadImage(PreviewSource);
    }
    const onEditSubmit = (e) => {
        e.preventDefault();
        if (!PreviewSource) return;
        if (!photo) return;
        if (!OldPreviewSource) return;
        editImage(PreviewSource);
    }

    const uploadImage = async (base64Encoded) => {
        const reqbody = {
            owner: id,
            image: base64Encoded,
            type: type
        }
        axios.post("/api/photos/upload", reqbody)
            .then(() => window.location.reload())
            .catch(err => console.error(err))    
    }
    const editImage = async (base64Encoded) => {
        const reqbody = {
            _id: photo._id,
            image: base64Encoded,
        }
        axios.post("/api/photos/edit", reqbody)
            .then(() => window.location.reload())
            .catch(err => console.error(err))
    }

    const deletePhoto = () => {
        if (!photo) return;
        const reqbody = {
            _id: photo._id,
        }
        axios.post("/api/photos/delete", reqbody)
            .then(() => window.location.reload())
            .catch(err => console.error(err))    
    }

    const Editor = () => {
        if (state === 0) return (
            <div className="container" style={{ margin: '10px 20px' }}>
                <div className="row">
                    <Button 
                        variant="contained" 
                        onClick={onEdit1}
                        style={{ backgroundColor: '#191919', color: '#fbcf36' }}
                        >
                        Modifer
                    </Button>
                    <div style={{ paddingTop: '20px', paddingLeft: '20px' }}></div>
                    <Button 
                        variant="contained" 
                        onClick={onEdit2}
                        style={{ backgroundColor: '#191919', color: '#fbcf36' }}
                        >
                        Supprimer
                    </Button>
                </div>
            </div>
        )
        if (state === 1) return (
            <div className="container" style={{ margin: '10px 20px' }}>
                <div className="row">
                    <input
                        type="file"
                        name="editImage"
                        onChange={FileInputChange}
                        required
                    />
                </div>
                <div className="row">
                    <Button 
                        variant="contained" 
                        onClick={onEditSubmit}
                        style={{ backgroundColor: '#191919', color: '#fbcf36' }}
                        >
                        Enregistrer
                    </Button>
                    <div style={{ paddingTop: '10px', paddingLeft: '20px' }}></div>
                    <Button 
                        variant="contained" 
                        onClick={onEdit0}
                        style={{ backgroundColor: '#191919', color: '#fbcf36' }}
                        >
                        Annuler
                    </Button>
                </div>
            </div>
        )
        if (state === 2) return (
            <div>
                <Button 
                    variant="contained" 
                    onClick={onEdit0}
                    style={{ backgroundColor: '#191919', color: '#fbcf36' }}
                    >
                    Annuler
                </Button>
                <div style={{ paddingTop: '10px'}}></div>
                <Button 
                    variant="contained" 
                    onClick={deletePhoto}
                    style={{ backgroundColor: '#191919', color: '#fbcf36' }}
                    >
                    Supprimer
                </Button>
            </div>
        )
    }

    const Checker = () => {
        if (black === true) return (
            <div>
                <div className={classes.paper}>
                    <div className="contain">
                        <div className={classes.image} style={{ backgroundColor: '#191919'}}>
                            { PreviewSource && (
                                <img src={PreviewSource} alt="pic" className={classes.image} />
                            )}
                        </div>
                    </div>
                </div>
                <div style={{ paddingTop: '10px'}}></div>
                <form onSubmit={onSubmit}>
                    <input
                        type="file"
                        name="image"
                        onChange={FileInputChange}
                        required
                    />
                    <br/>
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
        ); else return (
            <div>
                <div className="contain">
                    <div className={classes.image} style={{ backgroundColor: '#191919'}}>
                        { PreviewSource && (
                            <img src={PreviewSource} alt="pic" className={classes.image} />
                        )}
                    </div>
                </div>
                <div className="row" style={{ paddingTop: '10px'}}>
                    <Editor/>
                </div>
            </div>
        )
    }
    
    return (
        <div className="container-fluid App" style={{ maxHeight: "100%", minWidth: '100%', padding: '20px' }}>
            <Checker/>
        </div>
    )
}