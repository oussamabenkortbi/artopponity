import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import EditPhotos from '../Editor/EditPhotos';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
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

export default function Result({photo, editable, black, owner}) {
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
  
    const handleClickOpen = () => {
        setOpen(true);
    };

    const [openDelete, setOpenDelete] = React.useState(false);
  
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleDelete = () => {
        const id = {
            _id: photo._id
        }
        axios.post("/api/prestations/deletePresation", id)
            .then(() => {
                window.location.reload();
            }).catch(error => console.log(error))
    };

    if (editable === true) {
        if (black === true) {
            return (
                <div>
                    <div className={classes.paper}>
                        <div className="contain">
                            <div className={classes.image} style={{ backgroundColor: '#191919' }}></div>
                        </div>
                    </div>
                    <br/>
                    <Button variant="contained" onClick={handleClickOpen} style={{ backgroundColor: '#191919', color: '#fbcf36', marginLeft: '15px' }}>
                        Modifé
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <EditPhotos id={owner} type={3}/>
                    </Dialog>
                </div>
            )
        } else {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className={classes.paper}>
                                <div className="contain">
                                    <img 
                                        src={photo} 
                                        alt="pics" 
                                        className={classes.image}
                                    />
                                </div>
                            </div>
                            <div className="container-fluid">
                                <div className="row">
                                    <Button variant="contained" onClick={handleClickOpenDelete} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                                        Supprimer
                                    </Button>
                                    <Dialog
                                        open={openDelete}
                                        onClose={handleCloseDelete}
                                    >
                                        <div 
                                            className="container-fluid center"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: '#fbcf36',
                                                maxWidth: '300px',
                                                height: '200px'
                                            }}>
                                                <div 
                                                    className="row"
                                                    style={{ 
                                                        margin: '20px'
                                                    }}>
                                                        <Button variant="contained" onClick={handleCloseDelete} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                                                            Annuler
                                                        </Button>
                                                        <div style={{ padding: '0px 10px' }}></div>
                                                        <Button variant="contained" onClick={handleDelete} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                                                            Confirmer
                                                        </Button>
                                                </div>
                                        </div>
                                    </Dialog>
                                    <Button variant="contained" onClick={handleClickOpen} style={{ backgroundColor: '#191919', color: '#fbcf36', marginLeft: '20px' }}>
                                        Modifé
                                    </Button>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <EditPhotos id={owner} type={3}/> 
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div className={classes.paper}>
                <div className="contain">
                    <img 
                        src={photo} 
                        alt="pics" 
                        className={classes.image}
                    />
                </div>
            </div>
        )
    }
}