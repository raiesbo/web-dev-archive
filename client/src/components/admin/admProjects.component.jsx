import { useState, useEffect } from 'react';
import "./admProjects.styles.css";
import NewProjectTemplate from "./newProjectTemplate.component";
import UpdateProjectTemplate from "./updateProjectTemplate.component";
import ProjectsList from "./projectsList.component";
import Cookies from 'universal-cookie';



export default function AdminProjects({ url, username }) {

    const cookie = new Cookies();

    const [projectsList, setProjectsList] = useState([]);
    const [newProject, setNewProject] = useState({});
    const [patchProject, setPatchProject] = useState({});
    const [displayMode, setDisplayMode] = useState("projectsList");

    useEffect(() => {
        fetchData()
    }, [projectsList, username, url])

    const fetchData = () => {
        fetch(`${url}admin/${username}`)
            .then(response => response.json())
            .then(data => setProjectsList(data))
            .catch(e => console.log(e))
    }

    ///////////////////
    // display modes //
    ///////////////////

    const DISPLAY_MODES = {
        projectsList: "projectsList",
        newProject: "newProject",
        updateProject: "updateProject"
    }

    const displayHandler = (newMode) => {
        for (let mode of Object.keys(DISPLAY_MODES)) {
            if (mode === newMode) {
                setDisplayMode(newMode)
            }
        }
    }

    ////////////////////////
    // create new project //
    ////////////////////////

    const createProject = e => {
        e.preventDefault();

        // processing links // same Item
        newProject["links"] = { github: newProject.linkGithub, website: newProject.linkWebsite };
        // processing the tags // String -> Array
        newProject.tags = newProject.tagsString.split(",").map(tag => tag.trim());

        try {
            const res = fetch(`${url}admin/`, {
                method: "post",
                body: JSON.stringify({ action: "create", project: { ...newProject, "author": username }, token: cookie.get('token') }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = res.json()
        }
        catch (e) {
            console.log(e)
        }
        displayHandler("projectsList")
    }

    ////////////////////
    // delete project //
    ////////////////////

    const deleteProject = async (id) => {
        try {
            const res = await fetch(`${url}admin/`, {
                method: "post",
                body: JSON.stringify({ action: "delete", id: id, token: cookie.get('token') }),
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

    ////////////////////
    // update project //
    ////////////////////

    const updateProject = (e) => {
        e.preventDefault();

        // processing the tags // String -> Array
        patchProject.tags = patchProject.tagsString.split(",").map(tag => tag.trim());

        const updateItem = {
            name: patchProject.name,
            description: patchProject.description,
            tags: patchProject.tags,
            date: patchProject.date,
            links: patchProject.links
        }

        try {
            const res = fetch(`${url}admin/`, {
                method: "post",
                body: JSON.stringify({ action: "update", id: patchProject._id, updates: { ...updateItem }, token: cookie.get('token') }),
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
        displayHandler("projectsList")
    }

    const updateMode = (project) => {

        const projectToUpdate = { ...project }
        displayHandler("updateProject");

        projectToUpdate.tagsString = "";

        for (let i = 0; i < projectToUpdate.tags.length; i++) {
            if (i !== projectToUpdate.tags.length - 1) {
                projectToUpdate.tagsString = `${projectToUpdate.tagsString} ${projectToUpdate.tags[i]},`
            } else {
                projectToUpdate.tagsString = `${projectToUpdate.tagsString} ${projectToUpdate.tags[i]}`
            }
        }
        setPatchProject({ ...projectToUpdate })
    }


    ////////////////////
    // display switch //
    ////////////////////

    const controlDisplay = () => {
        let display = [];

        // return Array: [0] = main component, [1] = side button
        if (displayMode === "newProject") {
            return (
                display = [
                    <NewProjectTemplate
                        setNewProject={setNewProject}
                        newProject={newProject}
                        createProject={createProject}
                        displayHandler={displayHandler}
                    />,
                    <button
                        className="project-button"
                        onClick={() => displayHandler("projectsList")}
                    >Cancel new project</button>
                ]
            )
        } else if (displayMode === "updateProject") {
            return (
                display = [
                    <UpdateProjectTemplate
                        setPatchProject={setPatchProject}
                        patchProject={patchProject}
                        updateProject={updateProject}
                        displayHandler={displayHandler}
                    />,
                    <button
                        className="project-button"
                        onClick={() => displayHandler("projectsList")}
                    >Cancel update</button>
                ]
            )
        } else {
            return (
                display = [
                    <ProjectsList
                        projectsList={projectsList}
                        deleteProject={deleteProject}
                        updateMode={updateMode}
                    />,
                    <button
                        className="project-button"
                        onClick={() => displayHandler("newProject")}
                    >Create new project</button>
                ]
            )
        }
    }


    return (
        <div className="projectsList-container">


            <div className="current-projects">
                {controlDisplay()[0]}
            </div>

            <div className="control-panel">
                <div className="projects-num">
                    <h4 className="projects-num">N° of projects: {projectsList.length}</h4>
                </div>
                {controlDisplay()[1]}
            </div>


        </div>
    )
}