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

import Alert from '@material-ui/lab/Alert';
import { Dialog, Hidden, Paper, Button } from '@material-ui/core'

import { FaCheckCircle, FaMapMarkedAlt, FaMoneyBillAlt, FaRegEye } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiMusic2Fill } from "react-icons/ri";
import { GiPartyFlags } from "react-icons/gi";

import Progress from './Editor/Progress';

// import { UserData } from "../auth/userData";

class Profile extends Component {

  constructor() {
    super();
    this.state = {

      dashboard: false,
      edit: false,

      fullName: "",
      type: "",
      phone: 0,
      dicipline: '',
      description: "",
      wilaya: "",
      eventType: {},
      progress: 100,

      prestations: [],
      videos: [],

      isValid: false,
      isEmpty: false,
      isConfirmed: null,

      profilePic: '',
      coverPic: '',
      photos: [],

    };
  }

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
    if (localStorage.getItem('final')) this.setState({ progress: localStorage.getItem('final') })
    // else

    axios.post("/api/users/isConfirmed", artist)
      .then(res => {
        this.setState({ isConfirmed: res.data.isConfirmed })
      }).catch(err => console.log(err))
    
    // const artistData = UserData(this.props.id);
    // console.log(UserData(this.props.id).artistdata.firstName)

    axios.post("/api/artists/getInfoArtists", artist)
      .then(res => {
        this.setState({
          fullName: res.data.artist.fullName,
          phoneNumber: res.data.artist.phoneNumber,
          description: res.data.artist.description,
          wilaya: res.data.artist.wilaya,
          isValid: res.data.artist.isValid,
          dicipline: res.data.artist.dicipline,
          eventType: res.data.artist.eventType,
          categories: res.data.artist.categories,
        })
      }).catch(err => console.log(err));

    axios.post("/api/prestations/get", artist)
      .then(res => {
        if (res.data.prestations) this.setState({
          prestations: res.data.prestations,
        })
      }).catch(err => console.log(err));

    axios.post("/api/videos/get", artist)
      .then(res => {
        if (res.data.videos) this.setState({
          videos: res.data.videos,
        })
      }).catch(err => console.log(err));


    axios.post("/api/photos/getProfilePic", { artist: artist._id }) // get photos
      .then(res => { 
        if (res.data.photo) this.setState({ profilePic: res.data.photo.image }) })
      .catch(e => console.log(e))
    axios.post("/api/photos/getCoverPic", { artist: artist._id }) // get photos
      .then(res => { 
        if (res.data.photo) this.setState({ coverPic: res.data.photo.image }) })
      .catch(e => console.log(e))
    axios.post("/api/photos/getGallery", { artist: artist._id }) // get photos
      .then(res => { 
        if (res.data.photos) this.setState({ photos: res.data.photos }) 
      }).catch(e => console.log(e))
  }

  render() {

    const { user } = this.props.auth

    if (this.state.isConfirmed === false) {
      window.location.href = "/EditProfile";
      return (<></>)
    }

    if (this.state.progress === 0) {
      window.location.href = "/EditProfile";
    }
    
    if (this.state.progress < 40) {
      return (
        <div className="container center" style={{ height: '100vh' }}>
          <h2 style={{ paddingTop: '30vh' }}><b>Complétez votre profil à plus de 40% pour voir cette page</b></h2>
          <h5>Progress = {this.state.progress}%</h5>
        </div>
      )
    }

    else {
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
  
      function Description({description}) {

        const classes = useStyles();
  
        return (
          <Paper className={classes.paper} elevation={5}>
            <h5 style={{ paddingBottom: '15px'}}><b>Description</b></h5>
            <p style={{ maxHeight: '300px', overflow: 'auto' }}>{description}</p>
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
      
      const EventType = () => {

        let festival = "";
        let fete = "";
        let hotel = "";
        let proEvent = "";
        let animation = "";
        let publicEvent = "";
        let privateEvent = "";

        if (this.state.eventType.festival === true) festival = "festival -";
        if (this.state.eventType.fete === true) fete = "féte et mariage -";
        if (this.state.eventType.hotel === true) hotel = "hotel & restaurant -";
        if (this.state.eventType.proEvent === true) proEvent = "évènement professionnel -";
        if (this.state.eventType.animation === true) animation = "animation centre commercial -";
        if (this.state.eventType.publicEvent === true) publicEvent = "évènement public -";
        if (this.state.eventType.privateEvent === true) privateEvent = "évènement privé -";
        
        return (
          <p><GiPartyFlags className="react-icons"/><b> {festival} {fete} {hotel} {proEvent} {animation} {publicEvent} {privateEvent}</b></p>
        )
      }
      function Results({ wilaya, edit }) {
    
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
              <EventType/>
              <p><RiMusic2Fill className="react-icons"/><b> categories</b></p>
              <p><FaRegEye className="react-icons"/><b> profile visité 'x' fois</b></p>
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
  
      let isValid, VideChecker, ConfirmeChecker, validIcon;
  
  
      if (this.state.isValid === true) validIcon = (<FaCheckCircle/>)
      if (this.state.isValid === true) isValid = (<p style={{ marginBottom: '20px' }}><FaCheckCircle className="react-icons"/> <b> Profile Validé</b> par BRANCHINY</p>)
      if (this.state.dashboard === true) {
        VideChecker = (<Progress id={user.id} bar={false}/>)
        if (this.state.isConfirmed === false) ConfirmeChecker = (<Alert severity="error" style={{ marginBottom: '20px' }}>Confirmé Votre Email !</Alert>)
      }
  
      return (
        <div style={{ minHeight: '100vh' }}>
          
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
            <br/>
          </div>
          <div className="container-fluid">
            {VideChecker}
            {ConfirmeChecker}
            <Hidden smUp implementation="css"> {/* mobile */}
              <Results 
                wilaya={this.state.wilaya} 
                style={{ width:'100%' }}
              />
              <br/>
              <div>
                { this.state.prestations[0] && (
                  <>
                    <Prestations prestations={this.state.prestations} editable={1}/>
                  </>
                )}
              </div>
              <Description
                description={this.state.description} 
                style={{ width:'100%' }}
              />
              <br/>
              { this.state.videos[0] && (
                <Videos videos={this.state.videos}/>
              )}
              { this.state.photos[0] && (
                <Photos photos={this.state.photos}/>
              )}
              <CalendarPaper/>
            </Hidden>
            <Hidden xsDown implementation="css">
              <div className="row">
                <div className="col-md-4">
                  <Results 
                    wilaya={this.state.wilaya} 
                    style={{ width:'100%' }}
                  />
                  <br/>
                  <Description
                    description={this.state.description} 
                    style={{ width:'100%' }}
                  />
                  <br/>
                  <CalendarPaper/>
                </div>
                <div className="col-md">
                  <div>
                    { this.state.prestations[0] && (
                      <>
                        <Prestations prestations={this.state.prestations} editable={1}/>
                      </>
                    )}
                  </div>
                  { this.state.videos[0] && (
                    <>
                      <Videos videos={this.state.videos}/>
                    </>
                  )}
                  { this.state.photos[0] && (
                    <Photos photos={this.state.photos}/>
                  )}
                </div>
              </div>
            </Hidden>
          </div>
          <br/>
        </div>
      );
    }
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