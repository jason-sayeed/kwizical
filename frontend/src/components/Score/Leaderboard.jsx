import { useEffect, useState } from "react"
import { getUsersForLeaderboard } from "../../services/scoreService";
import leaderboard from "../../assets/leaderboard.png"

export const Leaderboard = ({ reloadLeaderboard }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsersForLeaderboard().then((users) => {
            users.sort((a, b) => {
                if (a.score === 0) return 1;
                if (b.score === 0) return -1;
                return b.score - a.score;
            });
            setUsers(users.slice(0, 5));
        });
    }, [reloadLeaderboard]);

    return (
        <div className="flex flex-col items-center sm:w-1/2 p-2">
            <div className="flex">
                <img
                    src={leaderboard}
                    alt="Leaderboard-logo"
                    className="w-full sm:max-h-60 max-h-16 m-4 sm:pb-4"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse border-navy-border bg-dark-purple bg-opacity-50 text-l sm:text-xl roboto">
                    <thead>
                        <tr>
                            <th className="border border-navy-border px-2 py-2">Ranking</th>
                            <th className="border border-navy-border px-2 py-2">Name</th>
                            <th className="border border-navy-border px-2 py-2">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Rows */}
                        {users.map((user, id) => (
                            <tr key={user._id}>
                                <td className="border border-navy-border px-2 py-1">{id + 1}</td>
                                <td className="border border-navy-border px-2 py-1">{user.name}</td>
                                <td className="border border-navy-border px-2 py-1">{user.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}