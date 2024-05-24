import { useEffect, useState } from "react"
import { addToUserScore } from "../../services/scoreService";

export const ScorePosting = ({ score, reloadLeaderboard, setReloadLeaderboard }) => {
    const [message, setMessage] = useState("Posting your score...");

    useEffect(() => {
        const scorePosted = localStorage.getItem("scorePosted");
        if (scorePosted === "false") {
            const email = localStorage.getItem("userEmail");
            if (email != null && email != "") {
                addToUserScore(email, score)
                    .then(() => {
                        setMessage("Your score has been saved!");
                        setReloadLeaderboard(!reloadLeaderboard);
                    })
                    .catch(() => {
                        setMessage("We're sorry, there was a problem uploading your score.");
                    });
            } else {
                setMessage("Want to upload your scores? Sign in with Google!");
            }
        }
        else {
            setMessage("Your score has been saved!");
        }
    }, [score, setReloadLeaderboard]);

    return (
        <div className="font-bold">
            {message}
        </div>
    )
}