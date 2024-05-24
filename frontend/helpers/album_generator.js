import { shuffle } from "../helpers/shuffle.js";
import { getAlbumsForArtist } from "../src/services/deezerService.js";

export const randomAlbums = async (artistID) => {
  try {
    
    const data = await getAlbumsForArtist(artistID);
    //create a list of dictionaries with artist ID and name
    const albumList = data.map(album => ({
      id: album.id,
      title: album.title
    }));

    const shuffledAlbums = shuffle(albumList); // Shuffle the array of albums
    const selectedAlbums = shuffledAlbums.slice(0, 4); // Select the first 4 albums
    return selectedAlbums;

  } catch (error) {
    console.error("Error fetching artists:", error);
    throw new Error("Unable to fetch random albums");
  }
};
