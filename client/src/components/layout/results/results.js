import React from 'react';
import Result from './result';
import axios from 'axios';

export default function Results() {

    const [ artists, setArtists ] = React.useState([]);

    React.useEffect(() => {
        axios.post("/api/artists/getArtistList")
            .then(res => {
                setArtists(res.data.artists);
            }).catch(e => console.log(e));
    }, []);

    return (
        <div className="container-fluid" style={{ textAlign: 'center' }}>
            { artists[0] && (
                <div>
                    { artists.length > 9 && (
                        <h5 className="center-align">
                            {artists.length} Artist Deja Inscrit
                        </h5>
                    )}
                </div>
            )}
            <div className="row" style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'center', justifyContent: 'space-between' }}>
                { artists[0] && (
                    <Result artist={artists[0]} key={artists[0].fullName}/>
                )}
                { artists[1] && (
                    <Result artist={artists[1]} key={artists[1].fullName}/>
                )}
                { artists[2] && (
                    <Result artist={artists[2]} key={artists[2].fullName}/>
                )}
                { artists[3] && (
                    <Result artist={artists[3]} key={artists[3].fullName}/>
                )}
            </div>
            <br/>
        </div>
    )
}