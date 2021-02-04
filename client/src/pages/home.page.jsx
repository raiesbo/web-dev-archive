import React from "react";
import "./home.styles.css"
import Navbar from "../components/navbar.component";
import Projects from "../components/projects.component";
import Footer from "../components/footer.component";


const Home = ({ darkModeHandler }) => {

    const navbarItems = {
        Home: ["https://raiesbo.com/", "portfolio"]
        // Login: ["/admin", "login"]
    }

    ////////////////////////////
    //DARK MODE//LOCAL STORAGE//
    ////////////////////////////

    // const [darkMode, setDarkMode ] = useState(false);
    // let storedDarkMode = localStorage.getItem("darkMode");

    // useEffect(() => {
    //     if (storedDarkMode === "true") {
    //         setDarkMode(true);
    //         document.getElementById("body").classList.toggle("darkmode");
    //     }
    // }, [])

    // const darkModeHandler = () => {
    //     // CLICK ON TOGGLE HANDLER
    //     setDarkMode(!darkMode)
    //     document.getElementById("body").classList.toggle("darkmode");
    //     localStorage.setItem("darkMode", !darkMode)
    // }


    return (
        <div className="home-container">

            <Navbar navbarItems={navbarItems} />
            <Projects modeHandler={darkModeHandler} />
            <Footer />

        </div>
    )
}


export default Home;