import "./admin.styles.css";
import Login from "../components/admin/login.component";
import AdminProjects from "../components/admin/projects.component";

import {
    Switch,
    Route
} from "react-router-dom";



export default function Admin() {

    return (
        <div className="admin-main">
            <div className="admin-container">
                <switch>
                    <Route to="/admin/login" exact>
                        <Login />
                    </Route>
                    <Route to="/admin/projects">
                        <AdminProjects />
                    </Route>
                </switch>

            </div>
        </div>
    )
}