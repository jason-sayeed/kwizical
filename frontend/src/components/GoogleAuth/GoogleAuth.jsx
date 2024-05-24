import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import "./GoogleAuth.css"
import { signup } from '../../services/authentication';

const GoogleAuth = () => {
    const navigate = useNavigate()
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            })
                .then(res => res.json())
                .then(data => {
                    signup(data.email, data.name, data.picture)
                        .then(() => {
                            localStorage.setItem("userName", data.name)
                            localStorage.setItem("userEmail", data.email)
                            localStorage.setItem("userImg", data.picture)
                            navigate("/kwizical")
                        })
                });
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    return (
    <div>
        <button className='login-with-google-btn rounded-lg shadow-md shadow-indigo-950 border-2 border-white hover:border-hot-pink hover:border-2' onClick={login}>Sign in with Google</button>
    </div>)
}

export default GoogleAuth