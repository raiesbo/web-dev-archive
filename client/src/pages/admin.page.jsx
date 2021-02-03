import "./admin.styles.css";
import Login from "../components/admin/login.component";
import SignUp from "../components/admin/signup.component";
import AdminProjects from "../components/admin/projects.component";
import Navbar from "../components/navbar.component";
import Footer from "../components/footer.component";

import {
    Switch,
    Route
} from "react-router-dom";



export default function Admin() {

    return (
        <div className="admin-main">
            <div className="admin-container">
                <Navbar />
                <Switch>
                    <Route to="/admin/sigup" exact>
                        <SignUp />
                    </Route>
                    <Route to="/admin/login" exact>
                        <Login />
                    </Route>
                    <Route to="/admin/projects" exact>
                        <AdminProjects />
                    </Route>
                </Switch>

                {/* <Footer /> */}
            </div>
        </div>
    )
}