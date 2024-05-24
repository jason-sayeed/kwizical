import { useState, useEffect } from "react";




export const Timer = ({onTimerUpdate }) => {
    const [isPlaying, setIsPlaying] = useState (false)


    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
         //When play is pressed, sets to isplaying. When pressed again, sets to !isplaying
       
      } 

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        onTimerUpdate(prevTimer => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, onTimerUpdate]);

  return null; // This component doesn't render anything visible
};

