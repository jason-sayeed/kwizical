import { shuffle } from "../helpers/shuffle.js";
import { getTopTracksForArtist, getTrack } from "../src/services/deezerService.js";

export const randomTrack = async (artistID) => {
  try {
    const data = await getTopTracksForArtist(artistID);
    const trackList = await Promise.all(data.map(async (track) => {
      const trackData = await getTrack(track.id);
      return {
        id: track.id,
        title: track.title,
        artist: track.artist.name,
        album: track.album.title,
        preview: track.preview,
        release_date: trackData.release_date
       
      };
    }));
 

    const shuffledTracksList = shuffle(trackList); // Shuffle the array of IDs
    const shuffledTracks = shuffledTracksList.slice(0, 4); 
    const selectedTrack = shuffledTracks[0]; // Select the first track

    return { selectedTrack, shuffledTracks };
  } catch (error) {
    console.error("Error fetching tracks:", error);
    throw new Error("Unable to fetch random track");
  }
};
