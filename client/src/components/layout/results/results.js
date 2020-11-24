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

    // const res = (
    //     <div>
    //         {   
    //             artists.map(
    //                 artist => <Result artist={artist} key={artist.fullName}/>
    //             )
    //         }
    //     </div>
    // )

    let number;
    if (artists.length > 9) number = (
        <h5 className="center-align">
            {artists.length} Artist Deja Inscrit
        </h5>
    )

    return (
        <div className="container-fluid" style={{ textAlign: 'center' }}>
            {number}
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