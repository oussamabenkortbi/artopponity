import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import axios from "axios";

class EditVideo extends Component {

    constructor() {
        super();
        this.state = {
            embedSrc: "",
            render: false,
            old: false,
            edit: false,
            delete: false,
        };
    };

    componentDidMount() {
        this.setState({
            embedSrc: this.props.video.embed,
            old: true
        })
    }

    onEdit = () => {
        const body = {
            _id: this.props.video._id,
            embed: this.state.embedSrc
        }
        axios.post("/api/videos/update", body)
            .catch(e => console.log(e));
    };

    onDeleteConfirmation = () => {
        this.setState({
            delete: true,
        })
    }

    onCancelConfirmation = () => {
        this.setState({
            delete: false,
        })
    }

    onDelete = () => {
        const body = {
            _id: this.props.video._id,
        }
        axios.post("/api/videos/delete", body)
            .then(() => window.location.reload())
            .catch(e => console.log(e));
    };

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
            old: false,
            render: true,
        })
    };

    onCancel = e => {
        this.setState({
            render: false,
            embedSrc: "",
        });
    };

    render() {      
        
        const DeleteCheck = () => {
            if (this.state.delete === true) return(
                <div>
                    <button 
                        onClick={this.onDelete}
                        className="btn"
                        >Confirmer
                    </button>
                    <button 
                        onClick={this.onCancelConfirmation}
                        className="btn Search-drop"
                        >Annuler
                    </button>
                </div>
            )
            return (
                <button 
                    onClick={this.onDeleteConfirmation}
                    className="btn"
                    >Supprimer
                </button>
            )
        }
        return (
            <div className="container-fluid App" style={{ maxHeight: "400px", minWidth: '40vw', padding: '20px' }}>
                <div className="row">
                    <div className="col">
                        <div>
                            <h3><b>modifier Video</b></h3>
                        </div>
                        <div className="input-field">
                            <label htmlFor="text" style={{ color: '#191919' }}>Vidéo url</label>
                            <input
                                type="text"
                                name="video"
                                onChange={this.onChange}
                            />
                        </div>
                        { this.state.old === true && (
                            <div>
                                <div className="contain">
                                    <iframe 
                                        title="embed" 
                                        src={this.state.embedSrc} 
                                        className="responsive-iframe" 
                                        frameBorder="0" 
                                        allowFullScreen="1"
                                    />
                                </div>
                                <br/>
                                <DeleteCheck/>
                            </div>
                        )}
                        { this.state.render === true && (
                            <div>
                                <div className="contain">
                                    <iframe 
                                        title="embed" 
                                        src={this.state.embedSrc} 
                                        className="responsive-iframe" 
                                        frameBorder="0" 
                                        allowFullScreen="1"
                                    />
                                </div>
                                <br/>
                                <button 
                                    onClick={this.onEdit}
                                    className="btn Search-drop"
                                    >Enregistrer
                                </button>
                                <button 
                                    onClick={this.onCancel}
                                    className="btn"
                                    >Annuler
                                </button>
                            </div>
                        )}
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}

EditVideo.propTypes = {
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
)(withRouter(EditVideo));