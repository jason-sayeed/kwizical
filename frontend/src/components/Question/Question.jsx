
const Question = ({ questionType }) => {

  const whichQuestion = (questionType) => {
    if (questionType === 0) {
      return "Name the track"
    } else if (questionType === 1) {
      return "Name the artist"
    } else if (questionType === 2) {
      return "Name the album"
    } else if (questionType === 3) {
    return "Guess the year"
  }
 
  }
  return (
    <>
      <div className="text-question-text-color"
      style={{ marginBottom: '10px' }} >
        {whichQuestion(questionType)}
      </div>
    </>
  );
};

export default Question;
