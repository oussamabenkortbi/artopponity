import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import EditPhotos from '../Editor/EditPhotos';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

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
                <div>
                    <div className={classes.paper}>
                        <div className="contain">
                            <img 
                                src={photo} 
                                alt="pics" 
                                className={classes.image}
                            />
                        </div>
                    </div>
                    <br/>
                    <div>
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