/** @type {import('tailwindcss').Config} */
export default {
  content: [   "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    
    extend: {
      backgroundColor: {
        "box-color": "#C9ACDB", // Define the custom box color - currently light-purple
        "hover-color": "#0E243C", // currently navy
        "correct-color": "#38a169", //equivalent to green-500
        "incorrect-color": "#e53e3e", //equivalent to red-500
        "dark-purple": "#9058C4",
        "light-purple": "#C9ACDB",
        yellow: "#FBF44A",
        turquoise: "#7CD8E0",
        "hot-pink": "#F94E80",
        navy: "#0E243C",
      },
      textColor: {
        'title-color': "#0E243C", // currently navy
        'text-color': "#0E243C", // currently navy
        'hover-text-color':'#F8F8F6', // currently cream
        'question-text-color':"#0E243C", // currently navy
        "dark-purple": "#9058C4",
        "light-purple": "#DD94D2",
        yellow: "#FBF44A",
        turquoise: "#7CD8E0",
        "hot-pink": "#F94E80",
        navy: "#0E243C",
      },
      backgroundImage: {
        'metal': 'url("../src/assets/backgrounds/metal1.png")',
        'RnB': 'url("../src/assets/backgrounds/rnb1.png")',
        'dance': 'url("../src/assets/backgrounds/dance1.png")',
        'hiphop': 'url("../src/assets/backgrounds/hiphop1.png")',
        'pop': 'url("../src/assets/backgrounds/pop1.png")',
        'film': 'url("../src/assets/backgrounds/movies1.png")',
        "homepage-background-0": 'url("../src/assets/rainbow-vortex.png")',
        "homepage-background-1": 'url("../src/assets/rainbow-vortex-1.png")',
        "homepage-background-2": 'url("../src/assets/rainbow-vortex-2.png")',
      },
      borderColor: {
        "hot-pink": "#F94E80",
        "navy-border": "#0E243C",
        "light-purple": "#DD94D2",
      },
      fontFamily: {
        'font-metal': ['Jacquard', 'sans-serif'],
        'question-font' : ["Jersey 15", "sans-serif"]
      },
      fontWeight: {
        "weight-400": "400",
      },
      backgroundSize: {
        full: "100% 100%",
      },
    },
  },

  plugins: [
    // The following plugins provides the sliding transition animation between "components" on the QuizPage
    // Initially being used to transition between the genrepicker component and the question and answer components (that make up the quiz)
    
    // Below we are defining an anonymous function with addUtilities as an object
    // addUtilities is a Tailwind function that is used to register new utility classes
    ({ addUtilities }) => {

      addUtilities({
        // here we are defining the custom utilities
        '@keyframes slideInRight': {
          from: { transform: 'translateX(100%)'}, // This defines that the element starts fully to the right
          to: { transform: 'translateX(0)' }, // This defines that the element ends in it's original position
        },
        '.animate__slideInRight': {
          animation: 'slideInRight', // Sets the slideInRight animation from the Animate.css library
          animationDuration: `1000ms`
        },
      
        '.custom-background': {
          backgroundColor: 'linear-gradient(to bottom right, #FCD34D, #F59E0B)',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\' viewBox=\'0 0 1600 800\'%3E%3Cg stroke=\'%23D34128\' stroke-width=\'63.8\' stroke-opacity=\'0.21\' %3E%3Ccircle fill=\'%23C79F7B\' cx=\'0\' cy=\'0\' r=\'1800\'/%3E%3Ccircle fill=\'%23c89d7c\' cx=\'0\' cy=\'0\' r=\'1700\'/%3E%3Ccircle fill=\'%23c89c7d\' cx=\'0\' cy=\'0\' r=\'1600\'/%3E%3Ccircle fill=\'%23c99a7e\' cx=\'0\' cy=\'0\' r=\'1500\'/%3E%3Ccircle fill=\'%23ca987f\' cx=\'0\' cy=\'0\' r=\'1400\'/%3E%3Ccircle fill=\'%23cb9680\' cx=\'0\' cy=\'0\' r=\'1300\'/%3E%3Ccircle fill=\'%23cb9481\' cx=\'0\' cy=\'0\' r=\'1200\'/%3E%3Ccircle fill=\'%23cc9382\' cx=\'0\' cy=\'0\' r=\'1100\'/%3E%3Ccircle fill=\'%23cd9183\' cx=\'0\' cy=\'0\' r=\'1000\'/%3E%3Ccircle fill=\'%23cd8f84\' cx=\'0\' cy=\'0\' r=\'900\'/%3E%3Ccircle fill=\'%23ce8d85\' cx=\'0\' cy=\'0\' r=\'800\'/%3E%3Ccircle fill=\'%23cf8b86\' cx=\'0\' cy=\'0\' r=\'700\'/%3E%3Ccircle fill=\'%23cf8a87\' cx=\'0\' cy=\'0\' r=\'600\'/%3E%3Ccircle fill=\'%23d08888\' cx=\'0\' cy=\'0\' r=\'500\'/%3E%3Ccircle fill=\'%23d08689\' cx=\'0\' cy=\'0\' r=\'400\'/%3E%3Ccircle fill=\'%23d1848a\' cx=\'0\' cy=\'0\' r=\'300\'/%3E%3Ccircle fill=\'%23d1828b\' cx=\'0\' cy=\'0\' r=\'200\'/%3E%3Ccircle fill=\'%23D2808C\' cx=\'0\' cy=\'0\' r=\'100\'/%3E%3C/g%3E%3C/svg%3E")',
          
        
        },
        //https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/
        //https://heropatterns.com
        
      });
    },
  ],
}

