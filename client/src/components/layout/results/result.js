import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

import { FaCheckCircle } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        alignItems: 'center'
    },
    paper: {
        marginBottom: theme.spacing(5),
        padding: theme.spacing(2),
        backgroundColor: '#fbcf36',
        color: '#191919',
        borderRadius: '15px',
        minWidth: '315px',
        maxWidth: '500px'
    },
    cover: {
        maxHeight: "200px",
        minWidth: "100%",
        width: "100%",
        objectFit: 'cover',
        objectPosition: '50% 0%',
        borderRadius: '15px',
    },
    profile: {
        height: "140px",
        width: "140px",
        border: '5px solid #fbcf36',
        objectFit: 'cover',
        position: "absolute",
        borderRadius: '50%',
        top: '65%',
        left: '34%'
    },
    center: {
        textAlign: 'center',
    }
}));

export default function Result({artist}) {

    const classes = useStyles();
    const link = "/p/" + artist._id
    const [Price, setPrice] = useState(0);
    const [ProfilePicture, setProfilePicture] = useState('');
    const [CoverPicture, setCoverPicture] = useState('');
    const [Min, setMinArtists] = useState(0);
    const [Max, setMaxArtists] = useState(0);

    React.useEffect(() => { 
        axios.post("/api/photos/getProfilePic", { artist: artist._id }) // get photos
            .then(res => { setProfilePicture(res.data.photo.image) })
            .catch(e => console.log(e))
        axios.post("/api/photos/getCoverPic", { artist: artist._id }) // get photos
            .then(res => { setCoverPicture(res.data.photo.image) })
            .catch(e => console.log(e))

        axios.post("/api/prestations/get", artist) // get prices && members
            .then(res => {
                let prices = [];
                let NumArtists = [];
                res.data.prestations.map(
                    prestation => {
                        prices.push(prestation.price)
                        NumArtists.push(prestation.artists)
                        return null;
                    }
                )
                setPrice(Math.min.apply(Math, prices))
                setMinArtists(Math.min.apply(Math, NumArtists))
                setMaxArtists(Math.max.apply(Math, NumArtists))
            }).catch(e => console.log(e))
     }, [artist]);

    const GetPhotos = () => {
        if (ProfilePicture && CoverPicture) return (
            <div style={{ position: 'relative', marginBottom: '70px' }}>
                <img 
                    src={CoverPicture} 
                    alt="CoverPicture" 
                    className={classes.cover}
                />
                <div 
                    style={{ 
                        width: '175px', 
                        height: '175px', 
                        position: "absolute",
                        top: '100%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}>
                    <img 
                        src={ProfilePicture} 
                        alt="ProfilePicture" 
                        style={{
                            width: "100%",
                            height: "100%",
                            border: '7px solid #fbcf36',
                            objectFit: 'cover',
                            borderRadius: '50%',
                        }}
                    />
                </div>
            </div>
        ) 
        else return (<></>)
    } 

    const CheckValid = () => {
        if (artist.isValid === true) return (
            <FaCheckCircle/>
        ) 
        else return (<></>)
    } 
    
    const GetPrice = () => {
        
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

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={8}> {/* onClick={this.onSubmit} */}
                <div>
                    <GetPhotos/>
                    <br/>
                    <div className={classes.center}>
                        <h2><b>{artist.fullName} </b><CheckValid/></h2>
                        <h5>{artist.type}</h5>
                    </div>
                </div>
                <div className="search-result">
                    <GetPrice/>
                    <h6><FaMapMarkedAlt className="react-icons"/><b> {artist.wilaya}</b></h6>
                    <p style={{ maxHeight: '100px', overflow: 'auto' }}>{artist.description}</p>
                </div>
                <div className={classes.center}>
                    <Button variant="contained" style={{ backgroundColor: '#191919' }}>
                        <a href={link} style={{ color: '#fbcf36' }}>Artist Page</a>
                    </Button>
                </div>
            </Paper>
        </div>
    )
}