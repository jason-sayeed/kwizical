import { shuffle } from "../helpers/shuffle.js";
import { getArtistsForGenre } from "../src/services/deezerService.js";

export const randomArtists = async (genreID) => {
  try {
    
    const data = await getArtistsForGenre(genreID);
    //create a list of dictionaries with artist ID and name
    const artistList = data.map(artist => ({
      name: artist.name,
      id: artist.id
    }));

    const shuffledArtists = shuffle(artistList); // Shuffle the array of artists
    const selectedArtists = shuffledArtists.slice(0, 4); // Select the first 4 artists
    return selectedArtists;

  } catch (error) {
    console.error("Error fetching artists:", error);
    throw new Error("Unable to fetch random artists");
  }
};

