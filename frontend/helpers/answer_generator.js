import { randomArtists } from "./artist_generator.js";
import { randomTrack } from "./track_generator.js";
import { randomAlbums } from "./album_generator.js"
import { shuffle } from "../helpers/shuffle.js"



export const answers = async (genreID, difficulty) => {
  let fourAlbums = false;
  let correctAnswerArtistID;
  let answerAlbums;
  while (!fourAlbums) {
    const selectedArtists = await randomArtists(genreID)
    correctAnswerArtistID = selectedArtists[0]["id"];
    answerAlbums = await randomAlbums(correctAnswerArtistID);
    if (answerAlbums.length >= 4) {
      fourAlbums = true;
    }
  }
  const answerList = [];
  // Randomly decide whether to use track titles or artist names or album title
  // Generates a random number between 0 and 2
  let questionType = null;


 if (difficulty === 1) {
   questionType = Math.floor(Math.random() * 2);
 } else {
  questionType = Math.floor(Math.random() * 4);
 }


  const { selectedTrack, shuffledTracks } = await randomTrack(correctAnswerArtistID);
  if (questionType === 0) {
    answerList.push(selectedTrack.title);
    for (let i = 1; i < shuffledTracks.length; i++) {
      answerList.push(shuffledTracks[i].title);
    }
  } else if (questionType === 1) {
    const answerArtists = await randomArtists(genreID);
    answerList.push(selectedTrack.artist);
    // Iterate over all artist expect the first and push their names to the answer list
    for (let i = 1; i < answerArtists.length; i++) {
      answerList.push(answerArtists[i].name);
    } 
  } else if (questionType === 2) {
      answerList.push(selectedTrack.album);
      for (let i = 1; i < answerAlbums.length; i++) {
        answerList.push(answerAlbums[i].title);
      }
    }
   
   
    else if (questionType === 3) {
      const releaseDate = new Date(selectedTrack.release_date);
      const releaseYear = releaseDate.getFullYear(); // Extract the year
      answerList.push(releaseYear.toString()); // Convert the year to a string and push it to the answer list
      // Generate and push other random years
      for (let i = 1; i < shuffledTracks.length; i++) {
        const randomYear = getRandomYear(releaseYear);
        answerList.push(randomYear);
    }
   }
   
   
   // Function to generate a random year (between 1900 and 2100)
   function getRandomYear(year) {
    const minYear = year - 10; // Minimum year
    const maxYear = Math.min(year + 10, 2024);// Maximum year
    return Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
   }
   
  // Shuffle the answers to randomize the position of the right answer
  const shuffledArtistAnswerList = shuffle(answerList);

  return { selectedTrack, shuffledArtistAnswerList, questionType };

};
