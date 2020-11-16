import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import axios from "axios";

import Prestations from '../Prestations/prestations';
import Dialog from '@material-ui/core/Dialog';
import AddPrestation from './AddPrestation';
import Button from '@material-ui/core/Button';

class EditPrestations extends Component {

    constructor() {
        super();
        this.state = {
            n: 0,
            prestations: [],
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const { user } = this.props.auth;
        const artist = {
            _id: user.id,
        };
        axios.post("/api/prestations/get", artist)
        .then(res => {
          this.setState({
            prestations: res.data.prestations,
            n: res.data.prestations.length
          })
        }).catch(err => console.log(err));
    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    }
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    render() {

        function CheckNbr ({nbr}) {
            const [open, setOpen] = React.useState(false);
          
            const handleClickOpen = () => {
              setOpen(true);
            };
          
            const handleClose = () => {
              setOpen(false);
            };

            if (nbr < 3) return (
                <div>
                    <Button 
                        variant="contained" 
                        onClick={handleClickOpen} 
                        style={{ color: '#fbcf36', backgroundColor: '#191919' }}
                    >Ajouter Prestation</Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <AddPrestation/>
                    </Dialog>
                </div>
            ) 
            else return (<div></div>)
        }

        return (
            <div className="container">
                <Prestations prestations={this.state.prestations} editable={2} paper={false}/> 
                <br/>
                <CheckNbr nbr={this.state.n}/>
            </div>
        )
    }
}

EditPrestations.propTypes = {
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
)(withRouter(EditPrestations));

                