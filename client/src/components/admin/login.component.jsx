import { useState } from "react";
import "./login.styles.css";


export default function Login() {
    const [formData, setFormData] = useState({});

    const handleUsername = (e) => setFormData({...formData, username: e.target.value });
    const handlePassword = (e) => setFormData({...formData, password: e.target.value });

    const onSubmit = async () => {
        const url = "http://localhost:5000/"

        try {
            const res = await fetch(`${url}login`, {
                method: "post",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json()

            console.log(data)

        }   
        catch (err) {
            console.log(err)
        }

    }

    return (
        <form className="login-form" onSubmit={onSubmit}>

            <div className="login-title">Log In</div>

            <label for="username">Username</label>
            <input type="text" name="username" onChande={handleUsername} required />

            <label for="password">Password</label>
            <input type="password" name="password" onChange={handlePassword} required />

            <div className="login-error"></div>

            <button>Submit</button>
        </form>
    )
}