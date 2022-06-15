import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../fbase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth";
import style from "./Auth.module.css";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

function Auth() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");

    const onChange = (e) => {
        const {
            target: { name, value }
        } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            navigate('/');
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    }

    const toggleAccount = () => {
        setNewAccount(prev => !prev);
    }
    const onSocialClick = async (e) => {
        const {
            target: { name }
        } = e;
        let provider;
        if (name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github") {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        navigate('/');
    }

    return (
        <div className={style.container}>
            <form onSubmit={onSubmit} className={style.form}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={onChange}
                    required
                    className={style.input}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={onChange}
                    required
                    className={style.input}
                />
                <input type="submit" className={style.btn} value={newAccount ? "Create Account" : "Sign In"} />
                <p className={style.error}>{error}</p>
                <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            </form>
            <div className={style.socialBox}>
                <button name="google" className={style.googleBtn} onClick={onSocialClick}><FcGoogle size={18} style={{marginRight: "8px"}}/>Continue with Google</button>
                <button name="github" className={style.githubBtn} onClick={onSocialClick}><AiFillGithub size={18} style={{marginRight: "8px"}}/>  Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;