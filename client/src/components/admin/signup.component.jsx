import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import "./login.styles.css";
import { useHistory } from 'react-router-dom';


export default function SignUp() {

    let history = useHistory();

    // handle form data
    const [formData, setFormData] = useState({});
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleUsername = (e) => setFormData({ ...formData, username: e.target.value });
    const handleEmail = (e) => setFormData({ ...formData, email: e.target.value });
    const handlePassword = (e) => setFormData({ ...formData, password: e.target.value });


    const signupUser = async (e) => {
        e.preventDefault();

        const url = "http://localhost:5000/"

        // reset errors
        setEmailError("")
        setUsernameError("")
        setPasswordError("")

        // post data to server
        try {
            const res = await fetch(`${url}signup`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();

            // handle errors
            if (data.errors) {
                setEmailError(data.errors.email)
                setUsernameError(data.errors.unsername)
                setPasswordError(data.errors.password)
            }

            // handle signup
            if (data.user) {
                const cookie = new Cookies();
                const maxAge = 3 * 24 * 60 * 60; // in Seconds
                cookie.set('token', String(data.token), { path: '/', maxAge });
                cookie.set('name', formData.username, { path: '/', maxAge });
                // console.log(cookie.get('token'));
                // console.log({user: data.user})
                return history.push('/admin/projects')
            }

        }
        catch (err) {
            console.log("ERROR: ", err)
        }
    }


    return (
        <form className="login-form" onSubmit={signupUser} >

            <div className="login-title">Sign Up</div>

            <label htmlFor="username">Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleUsername} />

            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleEmail} />

            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handlePassword} />

            <div className="username-error error">{usernameError}</div>
            <div className="email-error error">{emailError}</div>
            <div className="password-error error">{passwordError}</div>

            <button type="submit">Submit</button>

        </form>
    )
}
