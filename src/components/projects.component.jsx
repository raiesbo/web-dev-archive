import React, { useState, useEffect } from "react";
import "./projects.styles.css";
import projectsObj from "../assets/project.archive.json";

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
    const [projects, setProjects] = useState([...list, ...list, ...list, ...list, ...list, ...list, ...list, ...list])

    // useEffect(() => {
    //     for (let i of projectsObj) {
    //         setProjects.push(i)
    //     };
    // }), [];

    return (
        <div className="projects-container">

            <div className="projects-main">

                <header className="main-header">
                    <h1 className="title">Archive:</h1>
                    <h4 className="title-description">Collection of all the built projects untill now:</h4>
                </header>

                <div className="projects-collection">
                    
                    {projects.map((project) => {
                        return (
                            <div className="project-container">
                                <div className="project-tile">
                                    <i class="far fa-folder folder fa-lg"></i>
                                    <h3 className="project-title">{ project.title }</h3>
                                    <p className="project-description">{ project.description }</p>
                                    <p className="tags">{ project.tags.map(item => <span className="tag">{ item }</span>) }</p>
                                    <p className="project-date">{ project.date }</p>
                                    <div className="icons">
                                        {Object.keys(project.links).map(link => {
                                            return(
                                                <a href={project.links[link]}>{link == "website" ? <i class="fas fa-external-link-alt fa-lg"></i> : <i class="fab fa-github fa-lg"></i>}</a>
                                            )
                                        })}
                                    </div>
                                </div>
                                
                            </div>
                        )
                    })}

                </div>


            </div>

        </div>
    )
}


export default Projects;