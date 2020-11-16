import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Prestations from './Prestations/prestations';
import Videos from './Videos/videos';
import Photos from './Gallery/Photos';
import EditArtistInfo from './Editor/EditArtistInfo'
import EditArtistDescription from './Editor/EditArtistDescription'

import Alert from '@material-ui/lab/Alert';
import { Dialog, Hidden, Paper, Button } from '@material-ui/core'

import { FaCheckCircle, FaMapMarkedAlt, FaMoneyBillAlt, FaRegEye } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiMusic2Fill } from "react-icons/ri";


class Profile extends Component {

  constructor() {
    super();
    this.state = {

      dashboard: false,
      edit: false,

      fullName: "",
      type: "",
      phone: 0,
      description: "",
      wilaya: "",
      progress: 0,

      prestations: [],
      videos: [],

      isValid: false,
      isEmpty: false,
      isConfirmed: false,

      profilePic: '',
      coverPic: '',
      photos: [],

    };
  }

  onEdit = () => {
    this.setState({ edit: true });
  };
  onSave = () => {
    this.setState({ edit: false });
  };

  componentDidMount() {
    var artist = { //get id from link
      _id: this.props.id,
    };
    if (this.props.auth && this.props.auth.isAuthenticated === true) {
      const { user } = this.props.auth;
      if (this.props.id === user.id) { //link id vs user id 
        this.setState({
          dashboard: true 
        })
      }
    }     

    axios.post("/api/artists/getArtistsProgress", artist)
      .then(res => {
        this.setState({ progress: res.data.progress })
      }).catch(err => console.log(err));

    axios.post("/api/artists/getInfoArtists", artist)
      .then(res => {
        this.setState({
          fullName: res.data.artist.fullName,
          type: res.data.artist.type,
          age: res.data.artist.age,
          description: res.data.artist.description,
          wilaya: res.data.artist.wilaya,
          isValid: res.data.artist.isValid,
        })
      }).catch(err => console.log(err));

    axios.post("/api/prestations/get", artist)
      .then(res => {
        this.setState({
          prestations: res.data.prestations,
        })
      }).catch(err => console.log(err));

    axios.post("/api/videos/get", artist)
      .then(res => {
        this.setState({
          videos: res.data.videos,
        })
      }).catch(err => console.log(err));


    axios.post("/api/photos/getProfilePic", { artist: artist._id }) // get photos
      .then(res => { this.setState({ profilePic: res.data.photo.image }) })
      .catch(e => console.log(e))
    axios.post("/api/photos/getCoverPic", { artist: artist._id }) // get photos
      .then(res => { this.setState({ coverPic: res.data.photo.image }) })
      .catch(e => console.log(e))
    axios.post("/api/photos/getGallery", { artist: artist._id }) // get photos
      .then(res => { 
        this.setState({ 
          photos: res.data.photos
        }) 
      }).catch(e => console.log(e))

    if (this.state.progress < 70) this.setState({ isEmpty: true })
  }

  render() {

    const useStyles = makeStyles((theme) => ({
      root: {
          flexGrow: 1,
      },
      paper: {
          padding: theme.spacing(3),
          backgroundColor: '#fbcf36',
          color: '#191919'
      },
    }));

    function Description({description, edit}) {

      const [openDescription, setopenDescription] = React.useState(false);

      const handleOpenDescription = () => {
        setopenDescription(true);
      };
    
      const handleCloseDescription = () => {
        setopenDescription(false);
      };

      const classes = useStyles();

      return (
        <Paper className={classes.paper} elevation={5}>
          <h5 style={{ paddingBottom: '15px'}}><b>Description</b></h5>
          <p style={{ maxHeight: '300px', overflow: 'auto' }}>{description}</p>
          { edit === true && (
              <div>
                <Button variant="contained" onClick={handleOpenDescription} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                  Modifié
                </Button>
                <Dialog
                    open={openDescription}
                    onClose={handleCloseDescription}
                >
                  <EditArtistDescription/>
                </Dialog>
              </div>
            )
          }
        </Paper>
      )
    }

    function CalendarPaper() {
      const classes = useStyles();

      return (
        <Paper className={classes.paper} elevation={5}>
          <div>
            <Calendar className="calendar"/> 
          </div>
        </Paper>
      )
    }
    function Results({ wilaya, edit }) {

      const [openInfo, setopenInfo] = React.useState(false);
    
      const handleOpenInfo = () => {
        setopenInfo(true);
      };
      const handleCloseInfo = () => {
        setopenInfo(false);
      };

      let getWilaya;

      if (wilaya !== "") getWilaya = (
        <p><FaMapMarkedAlt className="react-icons"/><b> {wilaya}</b></p>
      )

      const classes = useStyles();
  
      return (
        <div className={classes.root}>
          <Paper className={classes.paper} elevation={5}>
            <h5 style={{ paddingBottom: '15px'}}><b>information</b></h5>
            <>{isValid}</>
            <GetPrice/>
            {getWilaya}
            <p><RiMusic2Fill className="react-icons"/><b> repertoir hiphop breakdance urbain</b></p>
            <p><FaRegEye className="react-icons"/><b> profile visité 'x' fois</b></p>
            { edit === true && (
                <div>
                  <Button variant="contained" onClick={handleOpenInfo} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                    Modifié
                  </Button>
                  <Dialog
                      open={openInfo}
                      onClose={handleCloseInfo}
                  >
                    <EditArtistInfo/>
                  </Dialog>
                </div>
              )
            }
          </Paper>          
        </div>
      )
    }      

    const GetPrice = () => {
      if (this.state.prestations[0]) {
        const prices = [];
        const NumArtists = [];

        this.state.prestations.map(
          prestation => {
              prices.push(prestation.price)
              NumArtists.push(prestation.artists)
              return null;
          }
        )
        const Price = Math.min.apply(Math, prices)
        const Min = Math.min.apply(Math, NumArtists)
        const Max = Math.max.apply(Math, NumArtists)
        
        if (Min === Max) {
          if (Min === 1) {
              return (
                  <div>
                      <h6><FaMoneyBillAlt className="react-icons"/> á partir de: <b>{Price} DA</b></h6>
                      <h6><BsFillPeopleFill className="react-icons"/> Avec: <b>{Min} artiste</b></h6>
                  </div>
              )
          }
          else {
              return (
                  <div>
                      <h6><FaMoneyBillAlt className="react-icons"/> á partir de: <b>{Price} DA</b></h6>
                      <h6><BsFillPeopleFill className="react-icons"/> Avec: <b>{Min} artistes</b></h6>
                  </div>
              )
          }
        }
        else return (
            <div>
                <h6><FaMoneyBillAlt className="react-icons"/> á partir de: <b>{Price} DA</b></h6>
                <h6><BsFillPeopleFill className="react-icons"/> Entre: <b>{Min} et {Max} members</b></h6>
            </div>
        )
      }
      else return (<></>)
    }

    if (this.state.error === true) return (<h3 className="col s12 center-align"><b>Error 404: Artist n'exist pas</b></h3>)

    let isValid, VideChecker, ConfirmeChecker, isAuth, validIcon;


    if (this.state.isValid === true) validIcon = (<FaCheckCircle/>)
    if (this.state.isValid === true) isValid = (<p style={{ marginBottom: '20px' }}><FaCheckCircle className="react-icons"/> <b> Profile Validé</b> par BRANCHINY</p>)
    if (this.state.dashboard === true) {
      if (this.state.isEmpty === true) VideChecker = (<Alert severity="error" style={{ marginBottom: '20px' }}>Profile Non Complete ! (Progress = {this.state.progress}%)</Alert>)
      if (this.state.isConfirmed === false) ConfirmeChecker = (<Alert severity="error" style={{ marginBottom: '20px' }}>Confirmé Votre Email !</Alert>)
      isAuth = (
        <div>
          { this.state.edit === true && (
              <Button variant="contained" onClick={this.onSave} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                Enregistrer
              </Button>
            )
          }
          { this.state.edit === false && (
              <Button variant="contained" onClick={this.onEdit} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                Modifé Profile
              </Button>
            )
          }
        </div>
      )
    }

    return (
      <div style={{ height: '100%' }}>
        
        <div style={{ position: 'relative', marginBottom: '95px' }}>
          <div style={{
            backgroundColor: '#191919',
            height: "350px",
            width: "100%",
          }}>
            { this.state.coverPic && (
              <img 
                src={this.state.coverPic} 
                alt="CoverPicture" 
                style={{ 
                  height: "100%",
                  width: "100%",
                  objectFit: 'cover',
                  objectPosition: '50% 10%',
                }}
              />
            )}
          </div>
          <div style={{
            backgroundColor: '#191919',
            width: '225px',
            height: '225px',
            position: "absolute",
            border: '7px solid #fbcf36',
            borderRadius: '50%',
            top: '100%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            { this.state.profilePic && (
              <img 
                src={this.state.profilePic} 
                alt="ProfilePicture" 
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            )}
          </div>
        </div>

        <br/>
        <div className="container center">
          <h1><b>{this.state.fullName} {validIcon}</b></h1>
          <h5 style={{ marginBottom: '15px' }}>{this.state.type}</h5>
          {isAuth}
          <br/>
        </div>
        <div className="container-fluid">
          {VideChecker}
          {ConfirmeChecker}
          <Hidden smUp implementation="css"> {/* mobile */}
            <Results 
              wilaya={this.state.wilaya} 
              style={{ width:'100%' }}
              edit={this.state.edit}
            />
            <br/>
            { this.state.edit === true && (
                <div>
                  { this.state.prestations[0] && (
                    <>
                      <Prestations prestations={this.state.prestations} editable={2}/>
                    </>
                  )}
                </div>
              )
            }
            { this.state.edit === false && (
                <div>
                  { this.state.prestations[0] && (
                    <>
                      <Prestations prestations={this.state.prestations} editable={1}/>
                    </>
                  )}
                </div>
              )
            }
            <Description
              description={this.state.description} 
              style={{ width:'100%' }}
              edit={this.state.edit}
            />
            <br/>
            { this.state.edit === true && (
                <div>
                  { this.state.videos[0] && (
                    <>
                      <Videos videos={this.state.videos} editable={true}/>
                    </>
                  )}
                </div>
              )
            }
            { this.state.edit === false && (
                <div>
                  { this.state.videos[0] && (
                    <>
                      <Videos videos={this.state.videos}/>
                    </>
                  )}
                </div>
              )
            }
            { this.state.edit === true && (
                <>
                  { this.state.photos[0] && (
                    <Photos photos={this.state.photos} editable={true}/>
                  )}
                </>
              )
            }
            { this.state.edit === false && (
                <>
                  { this.state.photos[0] && (
                    <Photos photos={this.state.photos}/>
                  )}
                </>
              )
            }
            <CalendarPaper/>
          </Hidden>
          <Hidden xsDown implementation="css"> {/* Desktop & Tablet */}
            <div className="row">
              <div className="col-md-4">
                <Results 
                  wilaya={this.state.wilaya} 
                  style={{ width:'100%' }}
                  edit={this.state.edit}
                />
                <br/>
                <Description
                  description={this.state.description} 
                  style={{ width:'100%' }}
                  edit={this.state.edit}
                />
                <br/>
                <CalendarPaper/>
              </div>
              <div className="col-md">
                { this.state.edit === true && (
                    <div>
                      { this.state.prestations[0] && (
                        <>
                          <Prestations prestations={this.state.prestations} editable={2}/>
                        </>
                      )}
                    </div>
                  )
                }
                { this.state.edit === false && (
                    <div>
                      { this.state.prestations[0] && (
                        <>
                          <Prestations prestations={this.state.prestations} editable={1}/>
                        </>
                      )}
                    </div>
                  )
                }
                { this.state.edit === true && (
                    <div>
                      { this.state.videos[0] && (
                        <>
                          <Videos videos={this.state.videos} editable={true}/>
                        </>
                      )}
                    </div>
                  )
                }
                { this.state.edit === false && (
                    <div>
                      { this.state.videos[0] && (
                        <>
                          <Videos videos={this.state.videos}/>
                        </>
                      )}
                    </div>
                  )
                }
                { this.state.edit === true && (
                    <>
                      { this.state.photos[0] && (
                        <Photos photos={this.state.photos} editable={true}/>
                      )}
                    </>
                  )
                }
                { this.state.edit === false && (
                    <>
                      { this.state.photos[0] && (
                        <Photos photos={this.state.photos}/>
                      )}
                    </>
                  )
                }
              </div>
            </div>
          </Hidden>
        </div>
        <br/>
      </div>
    );
  }
}

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Profile);