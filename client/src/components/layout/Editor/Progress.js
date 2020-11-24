import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: '#191919',
  },
  bar: {
    borderRadius: '5px',
    backgroundColor: '#f50057',
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function CustomizedProgressBars({ id, bar }) {
  
  const classes = useStyles();
  const [artistProgress, setArtistProgress] = React.useState(0);
  const [prestationsProgress, setPrestationsProgress] = React.useState(0);
  const [videosProgress, setVideosProgress] = React.useState(0);
  const [ProfilePicProgress, setProfilePicProgress] = React.useState(0);
  const [CoverProgress, setCoverProgress] = React.useState(0);
  const [GalleryProgress, setGalleryProgress] = React.useState(0);
  

  React.useEffect(() => {
    const artist = {
      _id: id
    }
    axios.post("/api/artists/getInfoArtists", artist)
      .then(res => {
        let prog = 0;
        if(res.data.artist.fullName) { prog = prog + 10 }
        if(res.data.artist.description) { prog = prog + 10 }
        if(res.data.artist.wilaya) { prog = prog + 10 }
        // if(res.data.artist.isValid === true) { prog = prog + 5 }
        // if(res.data.artist.dicipline) { prog = prog + 5 }
        if(res.data.artist.eventType) { prog = prog + 5 }
        if(res.data.artist.categories) { prog = prog + 5 }
        setArtistProgress(prog)
      }).catch(err => console.log(err));

    axios.post("/api/prestations/get", artist)
      .then(res => {
        if (res.data.prestations[0]) setPrestationsProgress(10)
      }).catch(err => console.log(err));

    axios.post("/api/videos/get", artist)
      .then(res => {
        let prog = 0;
        if (res.data.videos[0]) { prog = prog + 10 }
        if (res.data.videos[1]) { prog = prog + 5 }
        setVideosProgress(prog)
      }).catch(err => console.log(err));

    axios.post("/api/photos/getProfilePic", { artist: artist._id }) 
      .then(res => { if (res.data.photo) setProfilePicProgress(10) } ).catch(e => console.log(e))
    axios.post("/api/photos/getCoverPic", { artist: artist._id }) 
      .then(res => { if (res.data.photo) setCoverProgress(10) }).catch(e => console.log(e))
    axios.post("/api/photos/getGallery", { artist: artist._id }) 
      .then(res => {
        let prog = 0;
        if (res.data.photos[0]) { prog = prog + 5 }
        if (res.data.photos[1]) { prog = prog + 5 }
        setGalleryProgress(prog)
      }).catch(e => console.log(e))    

    }, [id]);
    
    
    const finalProgress = artistProgress + prestationsProgress + videosProgress + ProfilePicProgress + CoverProgress + GalleryProgress

    localStorage.setItem("final", finalProgress);
    
    const Bar = () => {
      return(
        <div className={classes.root}>
        <BorderLinearProgress variant="determinate" value={finalProgress}/>
      </div>
    )
  }

  if (bar === true) {
    return <><Bar/><div style={{ marginTop: '8px', marginLeft: '10px' }}><h4> {finalProgress} % </h4></div></>
  }
  
  else if (finalProgress < 70) {
    return (
      <Alert severity="error" style={{ marginBottom: '20px' }}>Profile Non Complete ! (Progress = {finalProgress}%)</Alert>
    )
  }

  else return (<></>)

}