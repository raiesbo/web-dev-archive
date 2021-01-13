import React from "react";
import Fade from 'react-reveal/Fade';

const Project = (props) => {

    return (
        <div>
            {props.projects.map((project) => {
                return (
                        <div className="project-container">
                            <div className="project-tile">
                            {/* <Fade  bottom cascade> */}
                                <i className="far fa-folder folder fa-lg"></i>
                                <h3 className="project-title">{ project.title }</h3>
                                <p className="project-description">{ project.description }</p>
                                <p className="tags">{ project.tags.map(item => <span className="tag">{ item }</span>) }</p>
                                <p className="project-date">{ project.date }</p>
                                <div className="icons">
                                {Object.keys(project.links).map(link => {
                                    return(
                                        <a href={project.links[link]}>{link === "website" ? <i className="fas fa-external-link-alt fa-lg"></i> : <i className="fab fa-github fa-lg"></i>}</a>
                                    )
                                })}
                            
                                </div>
                            {/* </Fade> */}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


export default Project;