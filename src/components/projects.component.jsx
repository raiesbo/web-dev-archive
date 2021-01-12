import React, { useState, useEffect } from "react";
import "./projects.styles.css";
import projectsList from "../assets/project.archive";
import Project from "./project.component";

const list = [{
    "title": "archPortfolio",
    "description": "Website dedicated to store my Architectutel projects and serve as an Online Portfolio. It is my first web project, acomplished in 2020 and hosted in firebase.",
    "tags": ["HTML", "CSS", "JS(ES6+)"],
    "links": {
        "github": "https://github.com/raiesbo/archPortfolio",
        "website": "https://archportfolio.raimonespasa.com/"
    },
    "date": "2020-04-01"
}]




const Projects = () => {
    const [projects, setProjects] = useState([...projectsList])

    // useEffect(() => {
    //     for (let item of projectsList) {
    //         console.log(item)
    //         setProjects(projects.push(item))
    //     }
    // }), [];

    console.log("state", projects)

    return (
        <div className="projects-container">

            <div className="projects-main">

                <header className="main-header">
                    <h1 className="title">Archive:</h1>
                    <h4 className="title-description">Collection of all the built projects untill now:</h4>
                </header>

                <div className="projects-collection">
                    <Project projects={projects.reverse()}/>
                </div>


            </div>

        </div>
    )
}


export default Projects;