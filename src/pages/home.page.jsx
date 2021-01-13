import React, { useState } from "react";
import "./home.styles.css"
import Navbar from "../components/navbar.component";
import Projects from "../components/projects.component";
import Footer from "../components/footer.component";


const Home = () => {

    const modeHandler = () => {
        document.getElementById("body").classList.toggle("darkmode");
    }

    return(
        <div className="home-container">

            <Navbar />
            <Projects modeHandler={modeHandler} />
            <Footer />
            
        </div>
    )
}


export default Home;