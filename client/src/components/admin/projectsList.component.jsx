




export default function ProjectsList({ projectsList, deleteProject }) {
    return (
        <>
            <h4 className="section-title">List of your projects:</h4>
            {
                projectsList.map((project, id) => {
                    return (

                        <div className="project-tile" key={id}>
                            <i className="far fa-folder folder fa-lg"></i>
                            <h3 className="project-title">{project.name}</h3>
                            <p className="project-description">{project.description}</p>
                            <p className="tags">{project.tags.map((item, id) => <span className="tag" key={id}>{item}</span>)}</p>
                            <p className="project-date">{project.date}</p>
                            <div className="project-icons-links">
                                {project.links && Object.keys(project.links).map((link, id) => {
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
            }
        </>
    )
}