import { useState, useEffect } from 'react';
import "./admProjects.styles.css";
import NewProjectTemplate from "./newProjectTemplate.component";
import UpdateProjectTemplate from "./updateProjectTemplate.component";
import ProjectsList from "./projectsList.component";




export default function AdminProjects({ url, username }) {

    const [projectsList, setProjectsList] = useState([]);
    const [newProject, setNewProject] = useState({});
    const [patchProject, setPatchProject] = useState({});
    const [projectsMode, setProjectsMode] = useState("projectsList");

    useEffect(() => {
        fetchData()
    }, [projectsList, username, url])

    const fetchData = () => {
        fetch(`${url}admin/${username}`)
            .then(response => response.json())
            .then(data => setProjectsList(data))
            .catch(e => console.log(e))
    }

    const modeHandler = (mode) => {
        mode === "projectsList" && setProjectsMode("projectsList");
        mode === "newProject" && setProjectsMode("newProject");
        mode === "updateProject" && setProjectsMode("updateProject");
        // mode !== "updateProject" || "newProject" && setProjectsMode("projectsList");
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
                body: JSON.stringify({ action: "create", project: { ...newProject, "author": username } }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = res.json()
        }
        catch (e) {
            console.log(e)
        }
        modeHandler("projectsList")
    }

    ////////////////////
    // delete project //
    ////////////////////

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
                body: JSON.stringify({ action: "update", id: patchProject._id, updates: { ...updateItem } }),
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
        modeHandler("projectsList")
    }

    const updateMode = (project) => {

        const projectToUpdate = { ...project }
        modeHandler("updateProject");

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



    return (
        <div className="projectsList-container">


            <div className="current-projects">
                {projectsMode === "newProject" && <NewProjectTemplate setNewProject={setNewProject} newProject={newProject} createProject={createProject} modeHandler={modeHandler} />}
                {projectsMode === "updateProject" && <UpdateProjectTemplate setPatchProject={setPatchProject} patchProject={patchProject} updateProject={updateProject} modeHandler={modeHandler} />}
                {projectsMode === "projectsList" && <ProjectsList projectsList={projectsList} deleteProject={deleteProject} updateMode={updateMode} />}
            </div>

            <div className="control-panel">
                <div className="projects-num">
                    <h4 className="">N° of projects: {projectsList.length}</h4>
                </div>
                {projectsMode === "projectsList" && <button className="project-button" onClick={() => modeHandler("newProject")}>Create new project{/*<i class="fas fa-plus"></i>*/}</button>}
                {projectsMode === "newProject" && <button className="project-button" onClick={() => modeHandler("projectsList")}>Cancel new project{/*<i class="fas fa-plus"></i>*/}</button>}
                {projectsMode === "updateProject" && <button className="project-button" onClick={() => modeHandler("projectsList")}>Cancel update{/*<i class="fas fa-plus"></i>*/}</button>}
            </div>


        </div>
    )
}