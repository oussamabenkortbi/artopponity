import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUserWithAdmin, logoutAdmin } from "../../../actions/authActions";
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
      alignItems: 'center',
  },
  paper: {
      margin: '20px 0px',
      padding: theme.spacing(3),
      backgroundColor: '#fbcf36',
      color: '#191919', 
  },
}));

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

function Dashboard(props) {

  const classes = useStyles();
  const { window } = props;

  const [ artists, setArtists ] = React.useState({});
  const [ current, setCurrernt ] = React.useState({});
  
  const [ diciplines, setDiciplines ] = React.useState({})
  const [ diciplinesPourcentage, setDiciplinesPourcentage ] = React.useState({})
  
  const [ progressLessThan75, setProgressLessThan75 ] = React.useState(0);
  const [ ProgressGTE75, setProgressGTE75 ] = React.useState(0);

  const [ progressLessThan75Pourcentage, setProgressLessThan75Pourcentage ] = React.useState(0);
  const [ ProgressGTE75Pourcentage, setProgressGTE75Pourcentage ] = React.useState(0);

  React.useEffect(() => {
    axios.post("/api/artists/getAll")
      .then(res => {
        let cptDicipline = 0;
        let cptProgressLessThan75 = 0;
        let cptProgressGTE75 = 0;
        const diciplines = {
          DJ: 0,
          Musiciens: 0,
          Arts: 0,
          Comédiens: 0,
          Danseurs: 0,
          Photographe: 0,
          Spectacle: 0,
          Animateur: 0,
        }
        res.data.artists.map((artist, key) => {
          axios.post("/api/users/getUserInfo", { artist: artist._id })
          .then(res => { 
            Object.assign(artist, res.data.user)
          }).catch(err => console.log(err))
          switch (artist.dicipline) {
            case 'DJ': diciplines.DJ++; cptDicipline++; break;
            case 'Musiciens': diciplines.Musiciens++; cptDicipline++; break;
            case 'Arts du cirque/arts urbains': diciplines.Arts++; cptDicipline++; break;
            case 'Comédiens': diciplines.Comédiens++; cptDicipline++; break;
            case 'Danseurs': diciplines.Danseurs++; cptDicipline++; break;
            case 'Photographe / Vidéaste': diciplines.Photographe++; cptDicipline++; break;
            case 'Spectacle pour enfants': diciplines.Spectacle++; cptDicipline++; break;
            case 'Animateur': diciplines.Animateur++; cptDicipline++; break;
            default: break;
          }
          if (artist.progress < 75) cptProgressLessThan75++;
          else if (artist.progress >= 75) cptProgressGTE75++;
        })
        setArtists(res.data.artists)
        setDiciplines(diciplines)
        setDiciplinesPourcentage({
          DJ: diciplines.DJ / cptDicipline * 100,
          Musiciens: diciplines.Musiciens / cptDicipline * 100,
          Arts: diciplines.Arts / cptDicipline * 100,
          Comédiens: diciplines.Comédiens / cptDicipline * 100,
          Danseurs: diciplines.Danseurs / cptDicipline * 100,
          Photographe: diciplines.Photographe / cptDicipline * 100,
          Spectacle: diciplines.Spectacle / cptDicipline * 100,
          Animateur: diciplines.Animateur / cptDicipline * 100,
        })
        setProgressLessThan75(cptProgressLessThan75);
        setProgressGTE75(cptProgressGTE75);

        setProgressLessThan75Pourcentage(cptProgressLessThan75 / res.data.artists.length * 100);
        setProgressGTE75Pourcentage(cptProgressGTE75 / res.data.artists.length * 100);
      }).catch(err => console.log(err))
    }, [])
  const deleteArtist = e => {
    const artist = {
      _id: current._id
    }
    if (artist._id) axios.post("/api/users/delete", artist)
      .then(() => {
        axios.post("/api/artists/delete", artist)
          .then(() => props.history.go(0))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  const loginArtist = e => {
    const artist = {
      _id: current._id
    }
    // get user data
    if (artist._id) axios.post("/api/users/getData", artist)
      .then(res => {
        const data = res.data.user
        // login user
        props.loginUserWithAdmin(data);
        // // logout admin
        props.logoutAdmin();
        // // go to profile
        props.history.push("/p/" + current._id)
      }).catch(err => console.log(err));
  }

  const validateArtist = e => {
    const artist = {
      _id: current._id,
    }
    // get user data
    if (artist._id) axios.post("/api/artists/validateArtist", artist)
      .then(() => props.history.go(0)).catch(err => console.log(err));
  }

  const goToProfile = e => {
    const artist = {
      _id: current._id,
    }
    if (artist._id) {
      props.history.push("/p/" + current._id)
    }
  }
  
  const confirmUser = e => {
    const artist = {
      _id: current._id,
    }
    // get user data
    if (artist._id) axios.post("/api/users/confirmUser", artist)
      .then(() => props.history.go(0)).catch(err => console.log(err));
  }

  console.log(artists)

  return (
    <div className="container" style={{ minHeight: '100vh', maxHeight: '700vh' }}>
      <br/>
      <h2 className="center">{artists.length} aritste</h2>
      <div className="row">
        <div className="col-md-6">
          <Paper className={classes.paper} elevation={5}>
            <h2 className="center"><b>diciplines des artistes</b></h2>
            <h5 style={{ paddingTop: '10px' }}>{diciplines.DJ} DJ {diciplinesPourcentage.DJ} %</h5>
            <BorderLinearProgress size={60} variant="determinate" value={diciplinesPourcentage.DJ} />
            <h5 style={{ paddingTop: '20px' }}>{diciplines.Musiciens} Musiciens {diciplinesPourcentage.Musiciens} %</h5>
            <BorderLinearProgress size={60} variant="determinate" value={diciplinesPourcentage.Musiciens} />
            <h5 style={{ paddingTop: '20px' }}>{diciplines.Arts} Arts du cirque/arts urbains {diciplinesPourcentage.Arts} %</h5>
            <BorderLinearProgress size={60} variant="determinate" value={diciplinesPourcentage.Arts} />
            <h5 style={{ paddingTop: '20px' }}>{diciplines.Comédiens} Comédiens {diciplinesPourcentage.Comédiens} %</h5>
            <BorderLinearProgress size={60} variant="determinate" value={diciplinesPourcentage.Comédiens} />
            <h5 style={{ paddingTop: '20px' }}>{diciplines.Danseurs} Danseurs {diciplinesPourcentage.Danseurs} %</h5>
            <BorderLinearProgress size={60} variant="determinate" value={diciplinesPourcentage.Danseurs} />
            <h5 style={{ paddingTop: '20px' }}>{diciplines.Photographe} Photographe / Vidéaste {diciplinesPourcentage.Photographe} %</h5>
            <BorderLinearProgress size={60} variant="determinate" value={diciplinesPourcentage.Photographe} />
            <h5 style={{ paddingTop: '20px' }}>{diciplines.Spectacle} Spectacle pour enfants {diciplinesPourcentage.Spectacle} %</h5>
            <BorderLinearProgress size={60} variant="determinate" value={diciplinesPourcentage.Spectacle} />
            <h5 style={{ paddingTop: '20px' }}>{diciplines.Animateur} Animateur {diciplinesPourcentage.Animateur} %</h5>
            <BorderLinearProgress size={60} variant="determinate" value={diciplinesPourcentage.Animateur} />
          </Paper>
          <Paper className={classes.paper} elevation={5}>
            <h2 className="center"><b>Progress des artistes</b></h2>
            <h5 style={{ paddingTop: '10px' }}>{ProgressGTE75} plus de 75% --- {ProgressGTE75Pourcentage} %</h5>
            <BorderLinearProgress size={60} variant="determinate" value={ProgressGTE75Pourcentage} />
            <h5 style={{ paddingTop: '20px' }}>{progressLessThan75} moins de 75% --- {progressLessThan75Pourcentage} %</h5>
            <BorderLinearProgress size={60} variant="determinate" value={progressLessThan75Pourcentage} />
          </Paper>
        </div>
        <div className="col-md-6">
          { artists[0] && (
            <div>
              {
                artists.map((artist) => (
                    <Paper className={classes.paper} elevation={5}>
                      <h5 style={{ paddingBottom: '15px'}}><b>nom: {artist.name}</b></h5>
                      <h5 style={{ paddingBottom: '15px'}}><b>nom du projet: {artist.fullName}</b></h5>
                      <h5 style={{ paddingBottom: '15px'}}><b>dicipline: {artist.dicipline}</b></h5>
                      { artist.progress && <h5 style={{ paddingBottom: '15px'}}><b>progress: {artist.progress} %</b></h5>}
                      { (artist.isValid === true) && <h5 style={{ paddingBottom: '15px'}}><b>Valide: oui</b></h5> }
                      { (artist.isValid === false) && <h5 style={{ paddingBottom: '15px'}}><b>Valide: non</b></h5> }
                      <Button onClick={() => {
                        setCurrernt(artist); 
                        deleteArtist(); 
                      }} style={{ backgroundColor: '#191919', color: '#fbcf36', margin: '10px 10px' }}>supprimer</Button>
                      <Button onClick={() => {
                        setCurrernt(artist); 
                        loginArtist(); 
                      }} style={{ backgroundColor: '#191919', color: '#fbcf36', margin: '10px 10px' }}>login</Button>
                      <Button onClick={() => {
                        setCurrernt(artist); 
                        validateArtist(); 
                      }} style={{ backgroundColor: '#191919', color: '#fbcf36', margin: '10px 10px' }}>valider</Button>
                      <Button onClick={() => {
                        setCurrernt(artist); 
                        confirmUser(); 
                      }} style={{ backgroundColor: '#191919', color: '#fbcf36', margin: '10px 10px' }}>confirmer</Button>
                      <Button onClick={() => {
                        setCurrernt(artist); 
                        goToProfile(); 
                      }} style={{ backgroundColor: '#191919', color: '#fbcf36', margin: '10px 10px' }}>profile</Button>
                    </Paper>
                  )
                )
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  logoutAdmin: PropTypes.func.isRequired,
  loginUserWithAdmin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutAdmin, loginUserWithAdmin }
)(Dashboard);