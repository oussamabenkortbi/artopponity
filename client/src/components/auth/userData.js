import axios from "axios";

export default function UserData(id) {

    let result;
    const artist = { _id: id }
    
    axios.post("/api/artists/getInfoArtists", artist)
        .then(res => {
            res.json = (res.data.artist)
        }).catch(e => console.log(e))

    console.log(result)
    return result;
}
