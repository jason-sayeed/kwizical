import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaderboard } from "../../components/Score/Leaderboard";
import { ScorePosting } from "../../components/Score/ScorePosting";
import { Navigation } from "../../components/Navigation/Navigation";
import totalscore from "../../assets/totalscore.png";

export const ScorePage = () => {
  const [score, setScore] = useState(null);
  const [genreID, setGenreId] = useState(null);
  const [bonus, setBonus] = useState(null);
  const [perfectRoundBonus, setPerfectRoundBonus] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [reloadLeaderboard, setReloadLeaderboard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const genreID = localStorage.getItem("genreID");
    if (genreID) {
      setGenreId(parseInt(genreID));
    }
    const storedScore = localStorage.getItem("score");
    if (storedScore) {
      setScore(parseInt(storedScore));
    }
    const storedBonus = localStorage.getItem("bonus");
    if (storedBonus) {
      setBonus(parseInt(storedBonus));
    }
    if (storedScore === 500) {
      setPerfectRoundBonus(250);
    } else {
      setPerfectRoundBonus(0);
    }
    if (storedScore && storedBonus) {
      setTotalScore(parseInt(storedScore) + parseInt(storedBonus));
    }
  }, []);

  const getRating = (score, genreID) => {
    if (score <= 200) {
      switch (genreID) {
        case 116: // Hip Hop
          return "Do you even know where Brooklyn is?";
        case 113: // Dance
          return "Do you even move your feet?";
        case 132: // Pop
          return "Do you even moonwalk?";
        case 165: // RnB
          return "You can't even slow dance!";
        case 173: // Films/Games
          return "Do you even have a TV?";
        case 464: // Metal
          return "You're clearly a groupie";
        default:
          return "Default rating message";
      }
    } else if (score >= 300 && score < 500) {
      switch (genreID) {
        case 116: // Hip Hop
          return "Not bad 25 Cent";
        case 113: // Dance
          return "You can do better two stepper!";
        case 132: // Pop
          return "You can do better moonwalks!";
        case 165: // RnB
          return "Keep singing in the shower";
        case 173: // Films/Games
          return "TV's nowadays have colors";
        case 464: // Metal
          return "Not bad, but you're out of tune!";
        default:
          return "Default rating message";
      }
    } else if (score === 500) {
      switch (genreID) {
        case 116: // Hip Hop
          return "Keep spitting those bars!";
        case 113: // Dance
          return "Great! You got the moves!";
        case 132: // Pop
          return "Oh yeah! It's Britney b*$^&!";
        case 165: // RnB
          return "You're hitting the right keys Alicia!";
        case 173: // Films/Games
          return "You wrote the script for success!";
        case 464: // Metal
          return "You're a true Metal Head!";
        default:
          return "Default rating message";
      }
    }
  };

  const rating = getRating(score, genreID);

  const handleGoBack = () => {
    navigate("/kwizical");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-homepage-background-1 bg-full roboto text-black">
      <Navigation />
      <div className="inset-0 flex justify-center items-center">
        <div className="flex flex-col w-3/4 h-3/4 rounded-lg bg-dark-purple bg-opacity-50 border-navy-border border-4 sm:border-8 overflow-x-auto p-2">
          <div className="overflow-x-auto flex flex-col sm:flex-row items-center sm:items-start w-full sm:h-3/4 md:mb-7">
            <div className="flex flex-col items-center h-max-1/3 sm:w-1/2 sm:border-r border-navy-border h-full">
              <div className="flex">
                <img
                  src={totalscore}
                  alt="Total-score-logo"
                  className="sm:max-h-60 max-h-16 m-4 sm:m-8"
                />
              </div>
              <div className="font-medium sm:text-xl sm:p-8 sm:space-y-4 space-y-1">
                <h1>ROUND SCORE: {score}</h1>
                <h1>PERFECT ROUND BONUS: {perfectRoundBonus}</h1>
                <h1>SPEED BONUS: {bonus}</h1>
                <h1 className="font-navy text-lg sm:text-2xl font-extrabold underline p-1">
                  YOUR SCORE: {totalScore}
                </h1>
              </div>
              <ScorePosting
                score={totalScore}
                reloadLeaderboard={reloadLeaderboard}
                setReloadLeaderboard={setReloadLeaderboard}
              />
            </div>

            <div className="flex flex-col items-center sm:w-1/2 p-2">
              <Leaderboard reloadLeaderboard={reloadLeaderboard} />
            </div>
          </div>
          <div className="w-full flex flex-col items-center mt-auto sm:border-t border-navy-border p-4">
            <p className="mb-4 text-3xl sm:text-5xl font-bold question-font sm:font-extrabold">
              {rating}
            </p>
            <div className="flex items-center">
              <button
                onClick={handleGoBack}
                className={`items-center justify-center bg-hot-pink text-navy font-semibold  w-60 h-10 
      rounded-lg shadow-md shadow-indigo-950 hover:shadow-none flex transition duration-300 
      ease-in-out transform`}
              >
                PLAY AGAIN!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorePage;
