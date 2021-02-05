import { useState, useEffect } from 'react';
import "./projects.styles.css";




export default function AdminProjects({ url, username }) {

    const [projectsList, setProjectsList] = useState([]);


    useEffect(() => {
        fetch(`${url}admin/${username}`)
            .then(response => response.json())
            .then(data => setProjectsList(data))
            .catch(e => console.log(e))
    }, [projectsList, url, username])

    const projects = () => {
        return (
            projectsList.map((project, id) => {
                return (
                    <div className="project-tile">
                        <button><i class="fas fa-pen folder fa-lg"></i></button>
                        <button><i class="fas fa-trash-alt"></i></button>
                        <h3 className="project-title">{project.name}</h3>
                        <p className="project-description">{project.description}</p>
                        <p className="tags">{project.tags.map((item, id) => <span className="tag" key={id}>{item}</span>)}</p>
                        <p className="project-date">{project.date}</p>
                        <div className="project-icons-links">
                            {Object.keys(project.links).map((link, id) => {
                                return (
                                    <a href={project.links[link]} key={id}>{link === "website" ? <i className="fas fa-external-link-alt fa-lg"></i> : <i className="fab fa-github fa-lg"></i>}</a>
                                )
                            })}

                        </div>
                    </div>
                )
            })
        )
    }


    return (
        <div className="projectsList-container">
            {/* <p>admin - projects</p> */}
            <div className="current-projects">
                <h4>List of your projects:</h4>
                {projectsList ? projects() : <p>"loading..."</p>}
            </div>

        </div>
    )
}