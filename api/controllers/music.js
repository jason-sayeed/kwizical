const getGenres = async (req, res) => {
    const requestOptions = {
        method: "GET"
    }

    const response = await fetch("https://api.deezer.com/genre", requestOptions);

    if (response.status !== 200) {
        throw new Error(`Unable to fetch genres. Status: ${response.status}. Headers: ${await response.text()}`);
    }

    const data = await response.json();
    res.status(200).json(data.data)
};

const getArtistsForGenre = async (req, res) => {
    const genreID = req.params.id;
    
    const requestOptions = {
        method: "GET"
    }

    const response = await fetch(`https://api.deezer.com/genre/${genreID}/artists`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch artists. Status: ${response.status}. Headers: ${await response.text()}");
    }

    const data = await response.json();
    res.status(200).json(data.data)
};

const getTopTracksForArtist = async (req, res) => {
    const artistID = req.params.id;
    
    const requestOptions = {
        method: "GET"
    }

    const response = await fetch(`https://api.deezer.com/artist/${artistID}/top`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch top tracks for artist");
    }

    const data = await response.json();
    res.status(200).json(data.data)
};

const getTrack = async (req, res) => {
    const trackID = req.params.id;
    
    const requestOptions = {
        method: "GET"
    }

    const response = await fetch(`https://api.deezer.com/track/${trackID}`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch top tracks for artist");
    }

    const data = await response.json();
    res.status(200).json(data)
};


const getAlbumsForArtist = async (req, res) => {
    const artistID = req.params.id;
    
    const requestOptions = {
        method: "GET"
    }

    const response = await fetch(`https://api.deezer.com/artist/${artistID}/albums`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch albums for artist");
    }

    const data = await response.json();
    res.status(200).json(data.data)
};

const MusicController = {
    getGenres: getGenres,
    getArtistsForGenre: getArtistsForGenre,
    getTopTracksForArtist: getTopTracksForArtist,
    getTrack: getTrack,
    getAlbumsForArtist: getAlbumsForArtist
};

module.exports = MusicController