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
            video: "",
            embedSrc: "",
            render: false,
        };
        this.onChange = this.onChange.bind(this);
    }

    onSubmit = () => {
        function getId(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
        
            return (match && match[2].length === 11)
              ? match[2]
              : null;
        }
        this.setState({
            embedSrc: "//www.youtube.com/embed/" + getId(this.state.video),
            render: true
        })
    }

    onSave = () => {
        const body = {
            video: this.state.embedSrc
        }
        axios.post("/api/videos/add", body)
            .catch(e => console.log(e));
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onCancel = e => {
        this.setState({
            render: false,
            video: "",
            embedSrc: "",
        });
    };

    render() {         
        const RenderCheck = () => {
            if (this.state.render === true) return (
                <div>
                    <iframe title="embed" width="560" height="315" src={this.state.embedSrc} frameBorder="0" allowFullScreen></iframe>
                    <br/>
                    <button 
                        onClick={this.onSave}
                        className="btn Search-drop"
                    >Enregistrer</button><button 
                        onClick={this.onCancel}
                        className="btn"
                    >Annnuler</button>
                </div>
            ); else return (
                <div>
                    <button 
                        onClick={this.onSubmit}
                        className="btn"
                    >Submit</button>
                </div>
            )
        }
        return (
            <div className="container-fluid App" style={{height: "300px"}}>
                <div className="row">
                    <div className="col" style={{ padding: '50px'}}>
                        <div>
                            <h3><b>Modifé Video</b></h3>
                        </div>
                        <label htmlFor="text" style={{ color: '#191919' }}>Vidéo Link</label>
                        <input
                            type="text"
                            name="video"
                            onChange={this.onChange}
                        />
                        <RenderCheck/>
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