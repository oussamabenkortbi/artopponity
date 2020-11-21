import React, { useState } from 'react'
import Photos from '../Gallery/Photos';
import axios from 'axios'

export default function EditGallery(id) {
    
    const [ Gallery, setGallery ] = useState([]);

    React.useEffect(() => {
        axios.post("/api/photos/getGallery", { artist: id.id }) // get photos
            .then(res => { 
                setGallery(res.data.photos)
            }).catch(e => console.log(e))
    }, [id]);

    return (
        <div className="container-fluid">
            <div style={{ paddingTop: '20px' }}>
                <h3><b>modifier Gallery</b></h3>
            </div>
            <Photos photos={Gallery} editable={true} paper={false} owner={id.id}/>
        </div>
    )
}