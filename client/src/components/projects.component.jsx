import React, { useState, useEffect } from "react";
import "./projects.styles.css";
import Project from "./project.component";

const projectsList = require("../assets/project.archive.json");

export default function Projects({ modeHandler }) {
    const [projects] = useState([...projectsList]);
    const [input, setInput] = useState("");
    const [tags, setTags] = useState([])
    const [filterTags, setFilterTags] = useState([])


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
            setFilterTags([])
        } else {
            setFilterTags([...filterTags, event.target.value])
        }
    }


    return (
        <div className="projects-container" id="home">

            <div className="projects-main">

                <header className="main-header">
                    <div className="title-box">
                        <h1 className="title">Archive:</h1>
                        <label className="switch">
                            <input type="checkbox" onClick={modeHandler} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <h4 className="title-description">List of all the projects that I've built or in progress:</h4>
                </header>

                <div className="filter-container">
                    <input value={input} onChange={handleInput} placeholder="Filter projects here..."></input>
                    <div className="filter-tags">{tags.map((tag, id) => {
                        return (
                            <button
                                className={"filter-tag " + ([...filterTags].includes(tag) ? "filter-tag-selected" : null)}
                                key={id}
                                onClick={handleTags}
                                value={tag}
                            >
                                { tag}
                            </button>
                        )
                    })}
                    </div>
                </div>

                <div className="projects-collection">

                    {
                        projects.filter(i => i.title.toLowerCase().includes(input))
                            .filter(e => filterTags ? filterTags.every(tag => e.tags.includes(tag)) : e)
                            .reverse()
                            .map((project, id) => (
                                <Project id={id} {...project} />
                            ))
                    }

                </div>
            </div>
        </div>
    )
}

