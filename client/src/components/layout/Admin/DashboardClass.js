import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUserWithAdmin, logoutAdmin } from "../../../actions/authActions";
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from "axios";

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            artists: {},
            tmp: {},
            current: {},

            diciplines: {},
            diciplinesPourcentage: {},
            
            progressLessThan75: 0,
            progressLessThan75Pourcentage: 0,
            ProgressGTE75: 0,
            ProgressGTE75Pourcentage: 0,
        }
    }

    componentDidMount() {
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
            this.setState({
                tmp: res.data.artists,
                diciplines: diciplines,
                diciplinesPourcentage: {
                    DJ: diciplines.DJ / cptDicipline * 100,
                    Musiciens: diciplines.Musiciens / cptDicipline * 100,
                    Arts: diciplines.Arts / cptDicipline * 100,
                    Comédiens: diciplines.Comédiens / cptDicipline * 100,
                    Danseurs: diciplines.Danseurs / cptDicipline * 100,
                    Photographe: diciplines.Photographe / cptDicipline * 100,
                    Spectacle: diciplines.Spectacle / cptDicipline * 100,
                    Animateur: diciplines.Animateur / cptDicipline * 100,
                },
                progressLessThan75: cptProgressLessThan75,
                progressGTE75: cptProgressGTE75,
                progressGTE75Pourcentage: cptProgressGTE75 / res.data.artists.length * 100,
                progressLessThan75Pourcentage: cptProgressLessThan75 / res.data.artists.length * 100,
            })
        }).catch(err => console.log(err))
    }
    
    
    render () {

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
                textAlign: 'left'
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

        function Stats({diciplines, diciplinesPourcentage, progressGTE75, progressGTE75Pourcentage, progressLessThan75, progressLessThan75Pourcentage}) {
            const classes = useStyles();
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md">
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
                        </div>
                        <div className="col-md">
                            <Paper className={classes.paper} elevation={5}>
                                <h2 className="center"><b>Progress des artistes</b></h2>
                                <h5 style={{ paddingTop: '10px' }}>{progressGTE75} plus de 75% --- {progressGTE75Pourcentage} %</h5>
                                <BorderLinearProgress size={60} variant="determinate" value={progressGTE75Pourcentage} />
                                <h5 style={{ paddingTop: '20px' }}>{progressLessThan75} moins de 75% --- {progressLessThan75Pourcentage} %</h5>
                                <BorderLinearProgress size={60} variant="determinate" value={progressLessThan75Pourcentage} />
                            </Paper>
                        </div>
                    </div>
                </div>
            )
        }
        
        function Users({artists, props}) {
            const classes = useStyles();

            const [ current, setCurrernt ] = React.useState({});
            
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

            return (
                <Grid container spacing={4}>
                    {
                        artists.map((artist, i) => (
                            <Grid item xs={12} sm={6}>
                                <Paper className={classes.paper} elevation={5} key={i}>
                                    <h5 style={{ paddingBottom: '15px'}}><b>nom:</b> {artist.name}</h5>
                                    <h5 style={{ paddingBottom: '15px'}}><b>email:</b> {artist.email}</h5>
                                    <h5 style={{ paddingBottom: '15px'}}><b>Telephone:</b> {artist.phoneNumber}</h5>
                                    <h5 style={{ paddingBottom: '15px'}}><b>projet:</b> {artist.fullName}</h5>
                                    <h5 style={{ paddingBottom: '15px'}}><b>dicipline:</b> {artist.dicipline}</h5>
                                    <h5 style={{ paddingBottom: '15px'}}><b>progress: {artist.progress} %</b></h5>
                                    { (artist.isValid === true) && <h5 style={{ paddingBottom: '15px'}}><b>Valide: </b> oui</h5> }
                                    { (artist.isValid === false) && <h5 style={{ paddingBottom: '15px'}}><b>Valide: </b> non</h5> }
                                    { (artist.isConfirmed === true) && <h5 style={{ paddingBottom: '15px'}}><b>Confirmé: </b> oui</h5> }
                                    { (artist.isConfirmed === false) && <h5 style={{ paddingBottom: '15px'}}><b>Confirmé: </b> non</h5> }
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
                            </Grid>
                            )
                        )
                    }
                </Grid>
            )
        }

        console.log(this.state.artists)

        return (
            <div style={{ minHeight: '100vh', maxHeight: '700vh' }}>
                <br/>
                <div className="container center">
                    <h2>{this.state.tmp.length} aritste</h2>
                    <Button onClick={() => {
                        this.setState({ artists: this.state.tmp })
                    }} style={{ backgroundColor: '#191919', color: '#fbcf36', margin: '10px 10px' }}>afficher les artistes</Button>
                </div>
                <Stats
                    diciplines={this.state.diciplines}
                    diciplinesPourcentage={this.state.diciplinesPourcentage}
                    progressGTE75={this.state.progressGTE75}
                    progressGTE75Pourcentage={this.state.progressGTE75Pourcentage}
                    progressLessThan75={this.state.progressLessThan75}
                    progressLessThan75Pourcentage={this.state.progressLessThan75Pourcentage}
                />
                <div className="container center">
                    { this.state.artists[0] && (
                        <Users
                            artists={this.state.artists}
                            props={this.props}
                        />
                    )}      
                </div>
                <br/>
            </div>
        )
    }

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