import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Adjust the import path as needed
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // const handleEmailLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await signInWithEmailAndPassword(auth, email, password);
    //         navigate('/dashboard'); // Redirect to dashboard after successful login
    //     } catch (error) {
    //         setError(error.message);
    //     }
    // };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="google-signin">
                <button onClick={handleGoogleLogin}>Sign in if your name is Justin</button>
            </div>
        </div>
    );
}

export default Login;