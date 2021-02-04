import { useState } from "react";
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import "./login.styles.css";


export default function Login() {

    let history = useHistory();

    // handle form data
    const [formData, setFormData] = useState({});
    const [loginError, setLoginError] = useState("");

    const handleUsername = (e) => setFormData({ ...formData, username: e.target.value });
    const handlePassword = (e) => setFormData({ ...formData, password: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        const url = "http://localhost:5000/";
        // const url = "";

        // reset errors
        setLoginError("")

        try {
            console.log(formData)
            const res = await fetch(`${url}login`, {
                method: "post",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json()
            // console.log(data)

            // handle errors
            if (data.errors) {
                console.log(data.errors)
                console.log("errors: ", data.errors)
                // setLoginError(data.errors);
            }

            // handle login
            if (data.user) {
                const cookie = new Cookies();
                const maxAge = 3 * 24 * 60 * 60; // in Seconds
                cookie.set('token', String(data.token), { path: '/', maxAge });
                // console.log(cookie.get('token'));
                console.log({ user: data.user })
                return history.push('/')
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <form className="login-form" onSubmit={onSubmit}>

            <div className="login-title">Log In</div>

            <label for="username">Username</label>
            <input type="text" name="username" onChange={handleUsername} required />

            <label for="password">Password</label>
            <input type="password" name="password" onChange={handlePassword} required />

            <div className="login-error">{loginError}</div>

            <button>Submit</button>
        </form>
    )
}