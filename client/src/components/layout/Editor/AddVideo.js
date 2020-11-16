import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import axios from "axios";

class AddVideo extends Component {

    constructor() {
        super();
        this.state = {
            embedSrc: "",
            render: false,
        };
    }

    onSave = () => {
        const { user } = this.props.auth;
        const body = {
            _id: user.id,
            embed: this.state.embedSrc
        }
        axios.post("/api/videos/add", body)
            .catch(e => console.log(e));
    }

    onChange = e => {
        function getId(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
        
            return (match && match[2].length === 11)
              ? match[2]
              : null;
        }
        this.setState({
            embedSrc: "//www.youtube.com/embed/" + getId(e.target.value),
            render: true
        })
    };

    onCancel = e => {
        this.setState({
            render: false,
            embedSrc: "",
        });
    };

    render() {       
        
        return (
            <div className="container-fluid App" style={{ width: '60vw' ,height: "900px", padding: '20px' }}>
                <div className="row">
                    <div className="col">
                        <div>
                            <h3><b>Ajouter Video</b></h3>
                        </div>
                        <label htmlFor="text" style={{ color: '#191919' }}>Vidéo Link</label>
                        <input
                            type="text"
                            name="video"
                            onChange={this.onChange}
                        />
                        { this.state.render === true && (
                            <div>
                                <button 
                                    onClick={this.onSave}
                                    className="btn Search-drop"
                                    >Enregistrer
                                </button>
                                <button 
                                    onClick={this.onCancel}
                                    className="btn"
                                    >Annuler
                                </button>
                                <iframe title="embed" width="560" height="315" src={this.state.embedSrc} frameBorder="0" allowFullScreen></iframe>
                            </div>
                        )}
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}

AddVideo.propTypes = {
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
)(withRouter(AddVideo));