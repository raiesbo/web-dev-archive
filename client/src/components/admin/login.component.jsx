import { useState } from "react";
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';
import "./login.styles.css";


export default function Login({ url }) {

    let history = useHistory();

    // handle form data
    const [formData, setFormData] = useState({});
    const [loginError, setLoginError] = useState("");

    const handleUsername = (e) => setFormData({ ...formData, username: e.target.value });
    const handlePassword = (e) => setFormData({ ...formData, password: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        // reset errors
        setLoginError("")

        try {
            // console.log(formData)
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
                Object.values(data.errors).map(item => item && setLoginError(item))
                // setLoginError(data.errors);
            }

            // handle login
            if (data.user) {
                const cookie = new Cookies();
                const maxAge = 3 * 24 * 60 * 60; // in Seconds
                cookie.set('token', String(data.token), { path: '/', maxAge });
                cookie.set('name', formData.username, { path: '/', maxAge });
                // console.log(cookie.get('token'));
                // console.log({ user: data.user })
                return history.push('/admin/projects')
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
            <input type="text" name="username" onChange={handleUsername} autocomplete='off' required />

            <label for="password">Password</label>
            <input type="password" name="password" onChange={handlePassword} autocomplete='off' required />

            <div className="login-error error">{loginError}</div>

            <button>Submit</button>
        </form>
    )
}