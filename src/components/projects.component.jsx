import React, { useState, useEffect } from "react";
import "./projects.styles.css";
import projectsList from "../assets/project.archive";
import Project from "./project.component";
// import Fade from 'react-reveal/Fade';


const Projects = ({ modeHandler }) => {
    const [ projects, setProjects ] = useState([...projectsList])
    const [ input, setInput ] = useState("")

    // useEffect(() => {
    //     for (let item of projectsList) {
    //         console.log(item)
    //         setProjects(projects.push(item))
    //     }
    // }), [];

    const handleInput = (event) => {
        setInput(event.target.value)
    }

    return (
        <div className="projects-container">

            <div className="projects-main">

                <header className="main-header">
                    <div className="title-box">
                        <h1 className="title">Archive:</h1>
                        <label className="switch">
                            <input type="checkbox" onClick={ modeHandler }/>
                            <span className="slider"></span>
                        </label>
                    </div>
                    <h4 className="title-description">Collection of all the built projects untill now:</h4>
                </header>
                <div className="filter-container">
                    <input value={ input } onChange={handleInput} placeholder="Filter projects here..."></input>
                </div>
                
                <div className="projects-collection">
                
                    {projects.filter(i => i.title.toLowerCase().includes(input)).reverse().map(project => (
                            <Project key={project.id} {...project} />
                    ))}
                
                </div>
            </div>
        </div>
    )
}


export default Projects;