import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName");
    const userImg = localStorage.getItem("userImg");

    const handleLogout = () => {
        googleLogout();
        localStorage.clear()
        navigate("/");
    }
    
    return (
        <>
        <div className="flex justify-between" style={{visibility: userName ? 'visible' : 'hidden' }}>
        <div className="text-lg font-bold p-9">
            <button className="border border-hot-pink rounded-lg p-3 bg-light-purple hover:bg-hover-color hover:text-light-purple roboto" onClick={handleLogout} >Logout</button>
        </div>
        <div className="p-7">
            <img src={userImg} className="rounded-full cursor-pointer"/>
        </div>
        </div>
        </>
    )
}