const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getGenres = async () => {
    const requestOptions = {
        method: "GET",
    };

    const response = await fetch(`${BACKEND_URL}/music/genre`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch genres");
    }

    const data = await response.json();
    return data;
};

export const getArtistsForGenre = async (genreID) => {
    const requestOptions = {
        method: "GET"
    };

    const response = await fetch(`${BACKEND_URL}/music/genre/${genreID}/artists`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch artists");
    }

    const data = await response.json();
    return data;
};

export const getTopTracksForArtist = async (artistID) => {
    const requestOptions = {
        method: "GET"
    };

    const response = await fetch(`${BACKEND_URL}/music/artist/${artistID}/top`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch top tracks for artist");
    }

    const data = await response.json();
    return data;
};

export const getTrack = async (trackID) => {
    const requestOptions = {
        method: "GET"
    };

    const response = await fetch(`${BACKEND_URL}/music/track/${trackID}`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch track");
    }

    const data = await response.json();
    return data;
};


export const getAlbumsForArtist = async (artistID) => {
    const requestOptions = {
        method: "GET"
    };

    const response = await fetch(`${BACKEND_URL}/music/artist/${artistID}/albums`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch artists");
    }

    const data = await response.json();
    return data;
};


