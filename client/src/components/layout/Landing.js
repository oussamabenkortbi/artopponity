import React, { Component } from "react";
import 'react-dropdown/style.css';

// import Dropdown from 'react-dropdown';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Type, Wilaya } from './Types'

import LoginWindow from "../auth/LoginWindow"
// import Xlr from '../images/xlr4.png'
import Logo from "../../components/images/logo.svg"

import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Results from './results/results';
import Footer from './Footer';

class Landing extends Component {
  
  constructor() {
    super();
    this.state = {
      searching: false,
      // Event: "",
      // Type: "",
      // Wilaya: "",
      // startDate: new Date(),

    };
  }

  // onDateChange = date => {
  //   this.setState({
  //     startDate: date,
  //   });
  // };

  // onEventChange = e => {
  //   this.setState({ Event: e.value });
  // };
  
  // onChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };
  
  onStopSearching = () => {
    this.setState({
      searching: false,
    });
  };


  onWilayaChange = e => {
      this.setState({ wilaya: e.value });
  };

  onTypeChange = e => {
      this.setState({ type: e.value });
  };

  /*
    <div className="row Search-bar App">
    <Dropdown    
        options={Type} 
        selected={this.state.Type}
        onChange={this.onTypeChange}
        placeholder="Cherche"
    />
    // <Dropdown 
    //     options={Event} 
    //     selected={this.state.Event}
    //     onChange={this.onEventChange}
    //     placeholder="Type d'évenement"
    // />
    <Dropdown 
        className="Search-drop" 
        options={Wilaya} 
        selected={this.state.Wilaya}
        onChange={this.onWilayaChange}
        placeholder="Wilaya"
    />
    // {/* <DatePicker
    //     selected={this.state.startDate}
    //     onChange={this.onDateChange}
    //     className="label"
    // /> 
    <button 
        className="btn waves-effect waves-light hoverable blue accent-3"
        onClick={()=>{this.onSearch()}}
        >CHERCHER
    </button>
   */

  render(){

    let AuthCheck;
    if(this.props.auth.isAuthenticated === false) AuthCheck = (
      <div className="container center" style={{ height: "100%", marginTop: '50px' }}>
        <div className="row">
          <div className="col-md">
            <div className="container center">
              <img src={Logo} alt="BRANCHINY" width="100%" style={{ padding: '15px'}}/>
              <h3>
                <b>Nous connectons les artistes aux opportunités afin de faciliter le booking</b>
              </h3>
            </div>
          </div>
          <div className="col-md-5" style={{ paddingTop: '30px'}}>
            <LoginWindow/>
          </div>
        </div>
        <Results/>
        {/* <Footer/> */}
      </div>
    ); else AuthCheck = (
      <div className="container center" style={{ height: "100vh", marginTop: '50px' }}>
        <div className="row">
          <div className="col">
            <div className="container center">
              <img src={Logo} alt="BRANCHINY" width="50%" style={{ padding: '15px'}}/>
              <h3>
                <b>Nous connectons les artistes aux opportunités afin de faciliter le booking</b>
              </h3>
            </div>
          </div>
        </div>
        <Results/>
        {/* <Footer/> */}
      </div>
    );

    if (this.state.searching === false) {
      return ( <div>{AuthCheck}</div> );
    }
    return (
      <div style={{ height: "100%" }}>
        <div className="container center-align">
          <h4><b>SearchResults</b></h4>
          <button 
            className="btn waves-effect waves-light hoverable blue accent-3"
            onClick={()=>{this.onStopSearching()}}
            >Page d'accueil
          </button>
          {/* <h4>{this.state.numberOfResults} Resultats pour votre recherche:</h4> */}
          <h4>Derniez artistes inscrits:</h4>
          <br />
        </div>
        <Results/>
      </div>
    )
  }
}

Landing.propTypes = {
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
)(withRouter(Landing));