import { useState, useEffect } from 'react';
import "./projects.styles.css";




export default function AdminProjects({ url, username }) {

    const [projectsList, setProjectsList] = useState([]);
    const [newProject, setNewProject] = useState({});


    useEffect(() => {
        fetchData()
    }, [projectsList, username, url])

    const fetchData = () => {
        fetch(`${url}admin/${username}`)
            .then(response => response.json())
            .then(data => setProjectsList(data))
            .catch(e => console.log(e))
    }

    const projects = () => {
        return (
            projectsList.map((project, id) => {
                return (
                    <div className="project-tile">
                        <i className="far fa-folder folder fa-lg"></i>
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
                        <button className="project-button"><i className="fas fa-pen"></i></button>
                        <button className="project-button" onClick={() => deleteProject(project._id)}><i className="fas fa-trash-alt"></i></button>
                    </div>
                )
            })
        )
    }

    const createProject = (project) => {
        try {
            const res = fetch(`${url}admin/`, {
                method: "post",
                body: JSON.stringify({action: "create", project: project }),
                headers: {
                    "Content-Type": "application/json"
                }

            });

            const data = res.json()
        }
        catch(e) {
            console.log(e)
        }
    }

    const deleteProject = async (id) => {
        try {
            const res = await fetch(`${url}admin/`, {
                method: "post",
                body: JSON.stringify({ action: "delete", id: id }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json()
            fetchData()
            console.log(data.message)
        }
        catch (e) {
            console.log(e)
        }
    }


    const NewProjectTemplate = ({createProject}) => {

        return (
            <div className="current-projects">
                <h4 className="section-title">New Project:</h4>
                <div className="project-tile new-project">
                    <form onSubmit={ ()=> createProject("")}>
                        <label htmlFor="name">Project´s name</label>
                        <input type="text" name="name" value="" />
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" />
                        <label htmlFor="date">Date</label>
                        <input type="text" name="date" />
                        <label htmlFor="tags">Tags</label>
                        <input type="text" name="tags" />
                        <label htmlFor="github">Github Repo</label>
                        <input type="text" name="github" />
                        <label htmlFor="web">Web URL</label>
                        <input type="text" name="web" />
                        <input type="text" />

                        <button>Save new project</button>
                    </form>
                </div>
            </div>
        )
    }



    return (
        <div className="projectsList-container">
            {/* <p>admin - projects</p> */}


            <div className="current-projects">
                {/* <NewProjectTemplate createProject={createProject}/> */}
                <h4 className="section-title">List of your projects:</h4>
                {projectsList ? projects() : <p>"loading..."</p>}
            </div>

            <div className="control-panel">
                <div className="projects-num">
                    <h4 className="">N° of projects: {projectsList.length}</h4>
                </div>
                <button className="project-button">Create new project{/*<i class="fas fa-plus"></i>*/}</button>
            </div>

        </div>
    )
}