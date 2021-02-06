import { useState, useEffect } from 'react';
import "./projects.styles.css";
import NewProjectTemplate from "./newProjectTemplate.component";
import ProjectsList from "./projectsList.component";




export default function AdminProjects({ url, username }) {

    const [projectsList, setProjectsList] = useState([]);
    const [newProject, setNewProject] = useState({});
    const [newProjectMode, setNewProjectMode] = useState(false);


    useEffect(() => {
        fetchData()
    }, [projectsList, username, url])

    const fetchData = () => {
        fetch(`${url}admin/${username}`)
            .then(response => response.json())
            .then(data => setProjectsList(data))
            .catch(e => console.log(e))
    }

    const modeHandler = () => {
        setNewProjectMode(!newProjectMode);
    }


    const createProject = e => {
        e.preventDefault();

        // processing the data
        newProject["links"] = { github: newProject.linkGithub, website: newProject.linkWebsite };
        newProject.tags = newProject.tagsString.split(",").map(tag => tag.trim());
        console.log(newProject)

        try {
            const res = fetch(`${url}admin/`, {
                method: "post",
                body: JSON.stringify({ action: "create", project: { ...newProject, "author": username } }),
                headers: {
                    "Content-Type": "application/json"
                }

            });

            const data = res.json()
            console.log(data)
        }
        catch (e) {
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



    return (
        <div className="projectsList-container">


            <div className="current-projects">
                {newProjectMode && <NewProjectTemplate setNewProject={setNewProject} newProject={newProject} createProject={createProject} modeHandler={modeHandler} />}
                {!newProjectMode && <ProjectsList projectsList={projectsList} deleteProject={deleteProject} />}
            </div>

            <div className="control-panel">
                <div className="projects-num">
                    <h4 className="">N° of projects: {projectsList.length}</h4>
                </div>
                <button className="project-button" onClick={modeHandler}>Create new project{/*<i class="fas fa-plus"></i>*/}</button>
            </div>


        </div>
    )
}