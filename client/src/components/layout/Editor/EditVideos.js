import React from "react";
import axios from "axios";
import Videos from '../Videos/videos';
import AddVideo from './AddVideo';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

export default function EditVideos({_id}) {

    const [videos, setVideos] = React.useState([]);
    const [number, setNumber] = React.useState(0);

    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };
  
    const handleClickOpen = () => {
        setOpen(true);
    };

    React.useEffect(() => {
        const artist = {
            _id: _id,
        }
        axios.post("/api/videos/get", artist)
            .then(res => {
                setVideos(res.data.videos)
                setNumber(res.data.videos.length)
            }).catch(err => console.log(err));
    }, [_id])

    const checkNbr = (nbrPrestation) => {
        if (nbrPrestation < 4) return (
            <div className="container center">
                <Button variant="contained" onClick={handleClickOpen} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                    Ajouter Video
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <AddVideo/>
                </Dialog>
            </div>
        )
        else return (<></>)
    }

    return (
        <div className="container-fluid" style={{ paddingTop: '20px', paddingRight: '45px' }}>
            {checkNbr(number)}
            <br/>
            <Videos videos={videos} editable={true} paper={false}/> 
        </div>
    );
}