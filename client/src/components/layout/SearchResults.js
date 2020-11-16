import React, { Component } from "react";
import axios from "axios";
import Results from './results/results';

class SearchResults extends Component {

    //each result in component!!

    constructor() {
        super();
        this.state = {
            numberOfResults: 0,
            artists: [],
        };
    }

    componentDidMount() {
        axios
            .post("/api/artists/FindArtist")
            .then(res => {
                    this.setState({
                        numberOfResults: res.data.artist.length,
                        artists: res.data.artist
                    })
                })
                .catch(err =>
                    console.log(err)
                )
            ;
    }

    render() {

        if (this.state.numberOfResults === 0) {
            return (<div style={{ height: "100vh" }}><h4>Pas du Resultats</h4></div>);
        }
        return (
            <div style={{ height: "100vh" }}>
                    <div className="container center-align">
                        <h4><b>SearchResults</b></h4>
                        <h4>{this.state.numberOfResults} Resultats pour votre recherche:</h4>
                        <br />
                    </div>
                    <Results artists={this.state.artists}/>
            </div>
        )
    }
}
export default SearchResults;