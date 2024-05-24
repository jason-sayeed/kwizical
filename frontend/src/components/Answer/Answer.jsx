import { useState, useEffect } from "react";

const Answer = ({
  selectedTrack,
  shuffledArtistAnswerList,
  onAnswerButtonClick,
  interactionDisabled,
  time
}) => {
  const [score, setScore] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [buttonColors, setButtonColors] = useState(
    new Array(4).fill("bg-box-color")
  );

  useEffect(() => {
    const storedScore = localStorage.getItem("score");
    if (storedScore) {
      setScore(parseInt(storedScore));
    }
    const storedBonus = localStorage.getItem("bonus");
    if (storedBonus) {
      setBonus(parseInt(storedBonus));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("score", score.toString()); //add score to localStorage to pass it to ScorePage
  }, [score]);

  useEffect(() => {
    localStorage.setItem("bonus", bonus.toString());
  }, [bonus]);

  const answerClick = (answer, id) => {
    const releaseDate = new Date(selectedTrack.release_date);
    const releaseYear = releaseDate.getFullYear();
    const isCorrect = (selectedTrack.title === answer) || (selectedTrack.artist === answer) || (selectedTrack.album === answer) || (releaseYear === parseInt(answer));
    const newButtonColors = [...buttonColors];
    if (isCorrect) {
      setScore(score + 100);
      if (time < 5) {
        setBonus(bonus + 50); // Add bonus points only if the answer is correct and the timer is less than 5 // Save bonus to localStorage
      }

      newButtonColors[id] = "bg-correct-color";
    } else {
      newButtonColors[id] = "bg-incorrect-color";
    }
    setButtonColors(newButtonColors);
    onAnswerButtonClick();

    setTimeout(() => {
      setButtonColors(new Array(4).fill("bg-box-color"));
    }, 1600);
  };

  return (
    <>
      <div className={`flex justify-center justify-items-center grid grid-cols-1 sm:gap-y-8 gap-y-4 md:grid-cols-2 gap-x-24`}>
        {" "}
        {/* 'grid grid-cols-2' this turns the row of answers into two columns. Adding md: applies the changes only when the screen is wider than the md breakpoint*/}
        {shuffledArtistAnswerList.map((answer, id) => (
          <button
            key={id}
            onClick={() => answerClick(answer, id)}
            disabled={interactionDisabled}
            className={`btn overflow-hidden relative
                md:w-80 w-72 md:h-24 h-20 text-text-color p-2 rounded-xl font-bold uppercase rounded-lg shadow-md hover:text-hover-text-color
                before:block before:absolute before:h-full before:w-full text-base md:text-xl
                before:left-0 before:top-0 before:-translate-y-full before:transition-transform ${buttonColors[id]
              }  
                ${buttonColors[id] === "bg-box-color"
                ? "hover:bg-hover-color"
                : ""
              } 
            `}
          >
            {answer}
          </button>
          
        ))}
      </div>
      <div className="mt-8 font-bold question-font text-2xl sm:text-4xl">
        <p className="text-question-text-color">Your Score: {score}</p>
        <p className="text-question-text-color">Speed Bonus: {bonus}</p>
      </div>
    </>
  );
};

export default Answer;
