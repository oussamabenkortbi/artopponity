import React from 'react';
import Result from './result';
import axios from 'axios';

export default function Results() {

    const [ artists, setArtists ] = React.useState([]);

    React.useEffect(() => {
        axios.post("/api/artists/getArtistList")
            .then(res => {
                setArtists(res.data.artists);
                console.log(res.data.artists.length)
            }).catch(e => console.log(e));
    }, []);

    const artist1 = artists.length - 1;
    const artist2 = artists.length;

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
                { artists[artist1] && (
                    <Result artist={artists[artist1]} key={artists[artist1].fullName}/>
                )}
                { artists[artist2] && (
                    <Result artist={artists[artist2]} key={artists[artist2].fullName}/>
                )}
            </div>
            <br/>
        </div>
    )
}