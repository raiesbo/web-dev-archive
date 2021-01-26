import "./navbar.styles.css";


const Navbar = () => {

    return(
        <div className="navbar-container">
            <div className="navbar-main">
                <a href="https://raimonespasa.com/" title="personal website" target="_blank" rel="noreferrer"><div className="logo">
                    <p>REB</p>
                </div></a>
                <nav>
                    <ul>
                        <li><a href="#home" title="Start">Home</a></li>
                        <li><button>CV</button></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;