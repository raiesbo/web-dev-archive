import React, { useState, useEffect } from "react";
import "./projects.styles.css";
import projectsList from "../assets/project.archive";
import Project from "./project.component";
// import Fade from 'react-reveal/Fade';


const Projects = ({ modeHandler }) => {
    const [ projects, setProjects ] = useState([...projectsList]);
    const [ input, setInput ] = useState("");
    const [ tags, setTags ] = useState([])
    const [ filterTags, setFilterTags ] = useState([])

    
    useEffect(() => {
        let testTAGS = []
        for (let project of projects) {
            for (let tag of project.tags) {
                if (!testTAGS.includes(tag)) {
                    testTAGS.push(tag)
                    setTags(tags => [...tags, tag])
                }
            }
        }
    }, [projects]);

    const handleInput = (event) => {
        event.preventDefault();
        setInput(event.target.value)
    }

    const handleTags = (event) => {
        event.preventDefault();
        if ([...filterTags].includes(event.target.value)) {
            let newArr = [...filterTags]
            let i = newArr.indexOf(event.target.value)
            delete newArr[i]
            setFilterTags(newArr)
        } else {
            setFilterTags([...filterTags, event.target.value])
        }
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
                    <div className="filter-tags">{ tags.map((tag) => {
                        return (
                            <button
                                className={ "filter-tag " + ([...filterTags].includes(tag) ? "filter-tag-selected" : null)}
                                onClick={ handleTags }
                                value={ tag }
                                >
                                { tag }
                                </button>
                        )
                    } ) }
                    </div>
                </div>
                
                <div className="projects-collection">
                
                    {
                        projects.filter(i => i.title.toLowerCase().includes(input))
                            .filter(e => filterTags !== [] ? filterTags.every(tag => e.tags.includes( tag )) : e)
                            .reverse()
                            .map(project => (
                                <Project key={project.id} {...project} />
                            )
                        )
                    }
                
                </div>
            </div>
        </div>
    )
}


export default Projects;