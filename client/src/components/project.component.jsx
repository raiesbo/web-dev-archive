import React from 'react';
import Fade from 'react-reveal/Fade';

const Project = ({ title, description, tags, date, links }, { id }) => {

    return (
        <Fade  bottom cascade>
        <div>
            <div className="project-container" key={ id }>
                <div className="project-tile">
                    <i className="far fa-folder folder fa-lg"></i>
                        <h3 className="project-title">{ title }</h3>
                        <p className="project-description">{ description }</p>
                        <p className="tags">{ tags.map((item, id) => <span className="tag" key={id}>{ item }</span>) }</p>
                        <p className="project-date">{ date }</p>
                        <div className="project-icons-links">
                        {Object.keys( links ).map((link, id) => {
                            return(
                                <a href={links[link]} key={id}>{link === "website" ? <i className="fas fa-external-link-alt fa-lg"></i> : <i className="fab fa-github fa-lg"></i>}</a>
                            )
                        })}
                            
                        </div>
                    </div>
            </div>
        </div>
        </Fade>
    )
}


export default Project;