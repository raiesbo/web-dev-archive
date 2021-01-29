import "./admin.styles.css";
import Login from "../components/admin/login.component";


export default function Admin() {

    return (
        <div className="admin-main">
            <div className="admin-container">
                <Login />
            </div>
        </div>
    )
}