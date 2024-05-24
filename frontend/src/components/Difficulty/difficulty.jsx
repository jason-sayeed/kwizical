const Difficulty = ({ onDifficultySelect }) => {
  const difficulties = [
    { id: 1, name: 'Casual Mode' },
    { id: 2, name: 'Expert Mode' },

  ]

  return (
    <div className="flex flex-col items-center justify-center question-font">
      <div className="mt-8">
        <h1 className="sm:text-6xl text-5xl font-bold mb-8 text-center text-title-color">
          Select difficulty
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-5 md:gap-12 p-8">
        {difficulties.map(difficulty => (
          <button key={difficulty.id} className={`bg-box-color hover:bg-hover-color hover:text-hover-text-color text-text-color font-bold w-40 h-40 sm:w-48 sm:h-48 
              rounded-lg shadow-md flex items-center justify-center transition duration-300 
              ease-in-out transform hover:scale-105`}
            onClick={() => onDifficultySelect(difficulty.id)}
          >
            <span className="text-2xl sm:text-3xl">{difficulty.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Difficulty