import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import EditVideo from '../Editor/EditVideo';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: '100%',
        backgroundColor: '#fbcf36',
        color: '#191919'
    }
}));

export default function Result({video, editable}) {
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
  
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    return (
        <div className={classes.root}>
            <div className={classes.paper}>
                <div className="contain">
                    <iframe 
                        title="embed" 
                        src={video.embed} 
                        className="responsive-iframe" 
                        frameBorder="0" 
                        allowFullScreen="1"
                    />
                </div>
            </div>
            <br/>
            { (editable === true) && (
                <div>
                    <Button variant="contained" onClick={handleClickOpen} style={{ backgroundColor: '#191919', color: '#fbcf36', marginLeft: '15px' }}>
                        Modifé
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <EditVideo video={video}/>
                    </Dialog>
                </div>
            )}
        </div>
    )
}