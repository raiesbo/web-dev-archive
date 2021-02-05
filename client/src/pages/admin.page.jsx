import "./admin.styles.css";
import { useState, useEffect } from "react";
import Login from "../components/admin/login.component";
import SignUp from "../components/admin/signup.component";
import AdminProjects from "../components/admin/projects.component";
import Navbar from "../components/navbar.component";
// import Footer from "../components/footer.component";
import Cookies from 'universal-cookie';

import { useParams, useHistory, url } from "react-router-dom";



export default function Admin({ url }) {

    const [username, setUsername] = useState("");
    const [logedIn, setLogedIn] = useState(false);

    const { action } = useParams();
    const cookie = new Cookies();
    let history = useHistory();

    console.log(0, cookie.get("jwt"))

    useEffect(async () => {
        if (cookie.get("token")) {
            setLogedIn(true)
            setUsername(cookie.get("name"))
        } else {
            setLogedIn(false)
            setUsername(cookie.get(""))
        }
    })


    const navbarItems = () => {

        if (logedIn) {
            return (
                [
                    <li><a href="/" title="home page">Home</a></li>,
                    <li onClick={handleLogout} className="logout link" style={{ cursor: "pointer" }}>LogOut</li>
                ]
            )
        } else {
            return (
                [
                    <li><a href="/" title="home page">Home</a></li>,
                    <li><a href="/admin/login" title="login page">LogIn</a></li>,
                    <li><a href="/admin/signup" title="signup page">SignUp</a></li>
                ]
            )
        }
    }

    const adminMenu = (a) => {
        console.log("action", a)
        switch (a) {
            case "signup":
                return <SignUp url={url} />;
            default:
                return <Login url={url} />;
        }
    }

    const handleLogout = () => {
        cookie.set('token', "", { path: '/', maxAge: 1 });
        cookie.set('name', "", { path: '/', maxAge: 1 });
        history.push("/")
    }


    return (
        <div className="admin-main">
            <div className="admin-container">
                <Navbar navbarItems={navbarItems} username={username} />

                {cookie.get('token') ? <AdminProjects url={url} username={username}/> : adminMenu(action)}

                {/* {adminMenu(action)} */}

                {/* <Footer /> */}
            </div>
        </div>
    )
}