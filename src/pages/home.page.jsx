import React from "react";
import "./home.styles.css"
import Navbar from "../components/navbar.component";
import Projects from "../components/projects.component";
import Footer from "../components/footer.component";


const Home = () => {

    return(
        <div className="home-container">
            <Navbar />

            <Projects />
            <Footer />
            
        </div>
    )
}


export default Home;