const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUsersForLeaderboard = async () => {
    const requestOptions = {
        method: "GET",
    };

    const response = await fetch(`${BACKEND_URL}/users/leaderboard`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch users for leaderboard");
    }

    const data = await response.json();
    return data.users;
}

export const addToUserScore = async (email, score) => {
    const payload = {
        email: email,
        score: score,
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/users/leaderboard`, requestOptions);

    // docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200
    if (response.status !== 200) {
        throw new Error(
            `Received status ${response.status} when posting score. Expected 200`
        );
    } else {
        localStorage.setItem("scorePosted", "true");
    }
}