import { Link } from "react-router-dom";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import logo from "../../assets/Kwizical_logo_no_bg_cropped.png"

import "./HomePage.css";
import { googleLogout } from "@react-oauth/google";

export const HomePage = () => {

  const handlePlayAsGuest = () => {
    googleLogout();
    localStorage.clear();
  }

  return (
    <div className="min-h-screen bg-full bg-cover bg-homepage-background-2 roboto overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="w-full md:w-1/2 lg:pr-8">
          <div className="md:p-8 md:pl-16 rounded-lg sm:text-left px-4">
            <div className="flex justify-center sm:justify-start">
              <img
                src={logo}
                alt="Kwizical-logo"
                className="w-60 h-60 mt-4"
              />
            </div>
            <div className="sm:text-9xl font-semibold text-white py-8 question-font text-6xl">{"LET'S GET KWIZICAL!"}</div>
            <div className="text-xl text-white mb-8">
              A fun and challenging quiz game to test your music knowledge!
            </div>
          </div>

        </div>


        <div className="w-full md:w-1/2 md:py-64">
          <h2 className="text-2xl font-bold mb-4 text-white">
            HOW TO PLAY
          </h2>
          <ol className="list-decimal list-inside text-lg text-gray-600 mb-4 text-white">
            <li>SELECT A GENRE OF MUSIC</li>
            <li>LISTEN TO THE SONG</li>
            <li>SELECT THE ANSWER</li>
            <li>EARN POINTS FOR CORRECT ANSWERS</li>
            <li>EARN BONUS POINTS FOR A PERFECT SCORE</li>
            <li>ANSWER QUICKLY FOR EVEN MORE POINTS!</li>
            {/* <li>Compete with other players on the leaderboard</li> */}
          </ol>

          <div className="p-2"><GoogleAuth /></div>
          <div className="p-2 py-4 mb-4">
            <Link
              to="/kwizical"
              className="bg-hot-pink text-white px-11 py-4 rounded-lg hover:bg-white hover:text-hot-pink hover:border-hot-pink hover:border-2 shadow-md shadow-indigo-950 hover:shadow-none transition-shadow duration-300"
              onClick={handlePlayAsGuest} 
            >
              Play as guest
            </Link>
          </div>
        </div>
      </div>
    
    </div>
  );
};
