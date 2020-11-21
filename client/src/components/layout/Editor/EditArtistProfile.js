import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import axios from "axios";
import classnames from "classnames";
import EditPhotos from "./EditPhotos";
// import UserData from '../../auth/userData'

class EditArtistProfile extends Component {

    constructor() {
        super();
        this.state = {
            nom: "",
            profilePic: '',
            coverPic: '',
            errors: {},
        };
        this.onChange = this.onChange.bind(this);
    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    }

    componentDidMount() {
        const { user } = this.props.auth;

        const id = {
            _id: user.id,
        }

        // const artist = UserData(user.id)

        // this.setState({ nom: artist._id })

        axios.post("/api/artists/getInfoArtists", id)
            .then(res => {
                    this.setState({
                        nom: res.data.artist.fullName,
                    })
                })
                .catch(err =>
                    console.log(err)
                )
            ;

        axios.post("/api/photos/getProfilePic", { artist: user.id }) // get photos
            .then(res => { this.setState({ profilePic: res.data.photo.image }) })
            .catch(e => console.log(e))
        axios.post("/api/photos/getCoverPic", { artist: user.id }) // get photos
            .then(res => { this.setState({ coverPic: res.data.photo.image }) })
            .catch(e => console.log(e))
    }
    
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const { user } = this.props.auth;
        const updater = {
            _id: user.id, //get artist id
            fullName: this.state.nom,
        };
        axios.post("/api/artists/registerArtist", updater)
            .catch(err => console.log(err));
    };
  
    render() {
        const { errors } = this.state;
        const { user } = this.props.auth;

        function PicChange({type}) {
            const [open, setOpen] = React.useState(false);
          
            const handleClickOpen = () => {
              setOpen(true);
            };
          
            const handleClose = () => {
              setOpen(false);
            };

            return (
              <>
                    <Button variant="contained" onClick={handleClickOpen} style={{ color: '#191919', backgroundColor: '#fbcf36' }}>modifier</Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <EditPhotos id={user.id} type={type}/>
                    </Dialog>
              </>
            );
        }

        return (
            <div>
                <div style={{ position: 'relative', marginBottom: '120px' }}>
                    <div style={{
                        backgroundColor: '#191919',
                        height: "350px",
                        width: "100%",
                    }}>
                        <div style={{
                            position: "absolute",
                            top: '20px',
                            left: '20px'
                        }}>
                            <PicChange type={2}/>
                        </div>
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
                        <div style={{
                            position: "absolute",
                            top: '80%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}>
                            <PicChange type={1}/>
                        </div>
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
                <div className="container" style={{height: "100%"}}>
                    <br/>
                    <div className="center">
                        <div className="input-field" >
                            <h5>nom du projet ou artiste</h5>
                            <input
                                onChange={this.onChange}
                                value={this.state.nom}
                                error={errors.nom}
                                id="nom"
                                type="text"
                                style={{ color: '#191919', maxWidth: "300px", textAlign: "center" }}
                                className={classnames("", {
                                    invalid: errors.nom || errors.nomnotfound
                                })}
                                />
                            <span className="red-text">
                                {errors.nom}
                                {errors.nomnotfound}
                            </span>
                        </div>
                        <Button onClick={this.onSubmit} style={{ backgroundColor: '#191919', color: '#fbcf36' }}>
                            Enregistrer
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

EditArtistProfile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
     auth: state.auth,
     errors: state.errors
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(withRouter(EditArtistProfile));