import { useState, useEffect } from "react";
import "./navbar.styles.css";


const Navbar = ({ navbarItems }) => {

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
                        {Object.keys(navbarItems).map((item, i) => {
                            return (
                                <li key={i}>
                                    <a href={navbarItems[item][0]} title={navbarItems[item][1]}>{item}</a>
                                </li>
                            )
                        })}
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