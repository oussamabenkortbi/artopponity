import React from 'react';
import Result from './result';
import axios from 'axios';

export default function Results() {

    const [ artists, setArtists ] = React.useState([]);

    React.useEffect(() => {
        axios.get("/api/artists/getArtistList")
            .then(res => {
                setArtists(res.data.artists);
            }).catch(e => console.log(e));
    }, []);

    return (
        <div>
            <p className="flow-text grey-text text-darken-1 center-align">
                {artists.length} Artist Deja Inscrit
            </p>
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '1em' }}>
                {   
                    artists.map(
                        artist => <Result artist={artist} key={artist.fullName}/>
                    )
                }
            </div>
            <br/>
        </div>
    )
}