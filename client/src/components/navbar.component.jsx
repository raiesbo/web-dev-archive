import { useState, useEffect } from "react";
import "./navbar.styles.css";


const Navbar = ({ navbarItems, username, logedIn }) => {

    //////////////////
    // SCROLL ARROW //
    //////////////////

    const [arrowOn, setArrowOn] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", e => {
            if (window.pageYOffset >= window.screen.height / 2) {
                setArrowOn(true)
            } else {
                setArrowOn(false)
            }
        });
    }, []);


    return (
        <div className="navbar-container">
            <div className="navbar-main">
                <a href="https://raiesbo.com/" title="personal website" target="_blank" rel="noreferrer"><div className="logo">
                    <p>REB</p>
                </div></a>
                <nav>
                    <ul>
                        {username && <li>{`Hi ${username}! 👋` }</li>}
                        {navbarItems().map((item, i) => item)}
                        {/* <li><button>CV</button></li> */}
                    </ul>
                </nav>

            </div>
            <div>
                {arrowOn && <a href="#home"><i class="fas fa-arrow-circle-up fa-2x"></i></a>}
            </div>
        </div>
    )
}

export default Navbar;