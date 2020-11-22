import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import EditPhotos from '../Editor/EditPhotos';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { FaPencilAlt } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';

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
    
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    };
  
    const handleClickOpen = () => {
        setOpen(true);
    };

    const IsPhoto = () => {
        if (photo) return (<EditPhotos id={owner} type={3} photo={photo}/>)
        return (<EditPhotos id={owner} type={3}/>)
    }

    if (editable === true) {
        if (black === true) {
            return (
                <div>
                    <div className={classes.paper} style={{ position: 'absolute' }}>
                        <div className="contain">
                            <div className={classes.image} style={{ backgroundColor: '#191919', marginLeft: '20px' }}></div>
                        </div>
                    </div>
                    <br/>
                    <Button variant="contained" onClick={handleClickOpen} style={{ backgroundColor: '#fbcf36', color: '#191919', marginLeft: '40px', marginTop: '40px', padding: '10px 0px' }}>
                        <GrAdd className="react-icons"/>
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <IsPhoto/>
                    </Dialog>
                </div>
            )
        } else {
            return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className={classes.paper} style={{ position: 'absolute' }}>
                                <div className="contain">
                                    <img 
                                        src={photo.image} 
                                        alt="pics" 
                                        className={classes.image}
                                    />
                                </div>
                            </div>
                            <Button variant="contained" onClick={handleClickOpen} style={{ backgroundColor: '#191919', color: '#fbcf36', marginLeft: '40px', marginTop: '40px', padding: '10px 0px' }}>
                                <FaPencilAlt className="react-icons"/>
                            </Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                            >
                                <EditPhotos id={owner} type={3} photo={photo}/>
                            </Dialog>
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