import "./admin.styles.css";
import Login from "../components/admin/login.component";
import SignUp from "../components/admin/signup.component";
import AdminProjects from "../components/admin/projects.component";
import Navbar from "../components/navbar.component";
// import Footer from "../components/footer.component";

import { Switch, Route, useParams } from "react-router-dom";



export default function Admin() {

    const { action } = useParams();


    const navbarItems = {
        Home: ["/", "home"],
        "Sign up": ["/admin/signup", "signup"],
        "Log in": ["/admin/login", "login"],
        "Log out": ["/admin/login", "login"]
    }

    console.log(action)
    const adminMenu = (a) => {
        console.log("action", a)
        switch (a) {
            case "signup":
                return <SignUp />;
            case "projects":
                return <AdminProjects />;
            default:
                return <Login />;
        }
    }

    return (
        <div className="admin-main">
            <div className="admin-container">
                <Navbar navbarItems={navbarItems} />


                {adminMenu(action)}
                {/* <p>{action}</p> */}

                {/* <Footer /> */}
            </div>
        </div>
    )
}