


export default function UpdateProjectTemplate({ setPatchProject, patchProject, updateProject, displayHandler }) {

    const handleName = (e) => setPatchProject({ ...patchProject, name: e.target.value });
    const handleDescription = (e) => setPatchProject({ ...patchProject, description: e.target.value });
    const handleDate = (e) => setPatchProject({ ...patchProject, date: e.target.value });
    const handleGithub = (e) => setPatchProject({ ...patchProject, links: { ...patchProject.links, github: e.target.value } });
    const handleWebsite = (e) => setPatchProject({ ...patchProject, links: { ...patchProject.links, website: e.target.value } });
    const handleTags = (e) => setPatchProject({ ...patchProject, tagsString: e.target.value });

    return (
        <div className="current-projects">
            <h4 className="section-title">Update Project:</h4>

            <div className="project-tile new-project projectAdmin-tile">

                <form onSubmit={updateProject}>
                    <label htmlFor="name">Project's title:</label>
                    <input type="text" name="name" onChange={handleName} value={patchProject.name} required />
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" onChange={handleDescription} value={patchProject.description} required />
                    <label htmlFor="date">Year of developement:</label>
                    <input type="text" name="date" onChange={handleDate} value={patchProject.date} required />
                    <label htmlFor="githubLink">Github link:</label>
                    <input type="text" name="githubLink" onChange={handleGithub} value={patchProject.links.github} required />
                    <label htmlFor="webLink">Website link:</label>
                    <input type="text" name="webList" onChange={handleWebsite} value={patchProject.links.website} required />
                    <label htmlFor="tags">Tags: (separated by ",")</label>
                    <input type="text" name="tags" onChange={handleTags} value={patchProject.tagsString} required />
                    <button>Update Project</button>
                    <button className="btn-icon" onClick={() => displayHandler("projectsList")}><i className="fas fa-times"></i></button>
                </form>

            </div>

        </div>
    )
}