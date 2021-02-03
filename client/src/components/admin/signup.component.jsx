import { useState, useEffect } from 'react';
import "./login.styles.css";
import { Redirect } from 'react-router-dom';


export default function SignUp() {

    // handle form data
    const [formData, setFormData] = useState({});
    const handleUsername = (e) => setFormData({ ...formData, username: e.target.value });
    const handleEmail = (e) => setFormData({ ...formData, email: e.target.value });
    const handlePassword = (e) => setFormData({ ...formData, password: e.target.value });


    const signupUser = async (e) => {
        e.preventDefault();

        // console.log(formData)

        try {
            const res = await fetch("http://localhost:5000/signup", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" }
            });

            console.log("FrontEnd ", res)

            res.redirected && console.log("redirected to ", res.url)
            if (res.redirected) {
                // console.log("redirected")
                <Redirect to={res.url} />
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

            <div className="username-error"></div>
            <div className="email-error"></div>
            <div className="password-error"></div>

            <button type="submit">Submit</button>

        </form>
    )
}
