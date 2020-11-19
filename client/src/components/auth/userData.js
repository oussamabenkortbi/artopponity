import axios from "axios";

export function UserData(id) {

    let result = {
        progress: 0,
    };
    const artist = { _id: id }

    axios.post("/api/artists/getArtistsProgress", artist)
        .then(res => {
            result.progress = result.progress + res.data.progress;
        }).catch(err => console.log(err));

    axios.post("/api/artists/getInfoArtists", artist)
        .then(res => {
            result.fullName = res.data.artist.fullName
            result.eventType = res.data.artist.eventType      
            result.phoneNumber = res.data.artist.phoneNumber
            result.description = res.data.artist.description
            result.wilaya = res.data.artist.wilaya
            result.isValid = res.data.artist.isValid
            result.dicipline = res.data.artist.dicipline
            result.eventType = res.data.artist.eventType
            result.categories = res.data.artist.categories
        }).catch(err => console.log(err));

    axios.post("/api/prestations/get", artist)
    .then(res => {
        result.prestations = res.data.prestations
    }).catch(err => console.log(err));

    axios.post("/api/videos/get", artist)
    .then(res => {
        result.videos = res.data.videos
    }).catch(err => console.log(err));

    axios.post("/api/photos/getProfilePic", { artist: artist._id }) // get photos
    .then(res => {
        result.profilePic = res.data.photo.image
    })
    .catch(e => console.log(e))
    axios.post("/api/photos/getCoverPic", { artist: artist._id }) // get photos
    .then(res => {
        result.coverPic = res.data.photo.image
    })
    .catch(e => console.log(e))
    axios.post("/api/photos/getGallery", { artist: artist._id }) // get photos
    .then(res => { 
        result.photos = res.data.photos
    }).catch(e => console.log(e))

    return (result);
}
