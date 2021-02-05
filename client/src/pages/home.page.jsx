import React from "react";
import "./home.styles.css"
import Navbar from "../components/navbar.component";
import Projects from "../components/projects.component";
import Footer from "../components/footer.component";


const Home = ({ darkModeHandler }) => {


    const navbarItems = () => {
        return (
            [
                <li><a href="https://raiesbo.com/" title="Portfolio Website">Home</a></li>
            ]
        )
    }


    return (
        <div className="home-container">

            <Navbar navbarItems={navbarItems} />
            <Projects modeHandler={darkModeHandler} />
            <Footer />

        </div>
    )
}


export default Home;