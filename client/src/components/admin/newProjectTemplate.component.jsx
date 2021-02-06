




export default function NewProjectTemplate({ setNewProject, newProject, createProject, modeHandler }) {

    const handleName = (e) => setNewProject({ ...newProject, name: e.target.value });
    const handleDescription = (e) => setNewProject({ ...newProject, description: e.target.value });
    const handleDate = (e) => setNewProject({ ...newProject, date: e.target.value });
    const handleGithub = (e) => setNewProject({ ...newProject, linkGithub: e.target.value });
    const handleWebsite = (e) => setNewProject({ ...newProject, linkWebsite: e.target.value });
    const handleTags = (e) => setNewProject({ ...newProject, tagsString: e.target.value });

    return (
        <div className="current-projects">
            <h4 className="section-title">New Project:</h4>

            <div className="project-tile new-project projectAdmin-tile">
                <form onSubmit={createProject}>
                    <label htmlFor="name">Project's title:</label>
                    <input type="text" name="name" onChange={handleName} required/>
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" onChange={handleDescription} required/>
                    <label htmlFor="date">Year of developement:</label>
                    <input type="text" name="date" onChange={handleDate} required/>
                    <label htmlFor="githubLink">Github link:</label>
                    <input type="text" name="githubLink" onChange={handleGithub} required/>
                    <label htmlFor="webLink">Website link:</label>
                    <input type="text" name="webList" onChange={handleWebsite} required/>
                    <label htmlFor="tags">Tags: (separated by ",")</label>
                    <input type="text" name="tags" onChange={handleTags} required/>
                    <button>Save new Project</button>
                    <button className="btn-icon" onClick={() => modeHandler("projectsList")}><i className="fas fa-times"></i></button>
                </form>
            </div>
        </div>
    )
}