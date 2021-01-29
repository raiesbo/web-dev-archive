import "./login.styles.css";


export default function Login() {

    return (
        <form className="login-form">
            <div className="login-title">Log In</div>
            <label for="username">Username</label>
            <input type="text" name="username" />
            <label for="password">Password</label>
            <input type="password" name="password" />
            <button>Submit</button>
        </form>
    )
}