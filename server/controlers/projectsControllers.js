const Project = require("../models/project");



module.exports.projects_get = async (req, res) => {

    try {
        const projects = await Project.find();
        res.send(projects)
    }
    catch (err) {
        res.status(400).send(err)
    }

}

module.exports.admin_get = async (req, res) => {
    const author = req.params.author

    try {
        const projects = await Project.find({ author });
        res.send(projects)
    }
    catch (err) {
        res.status(400).send(err)
    }

}

module.exports.admin_post = async (req, res) => {
    const { action } = req.body;

    switch (action) {
        case "delete":
            const deleteId = req.body.id;
            const deletedProject = await Project.findByIdAndRemove(deleteId, { useFindAndModify: false });
            return res.status(200).send("the project has been deleted");
        case "update":
            const { updates, id } = req.body;
            const updatedProject = await Project.findByIdAndUpdate(id, updates, { useFindAndModify: false });
            console.log(updatedProject)
            return res.status(200).json(updatedProject);
        case "create":
            const { project } = req.body;
            const newProject = await Project.create({ ...project })
            console.log(newProject)
            return res.status(200).send(newProject)
        default:
            return res.status(400).send("no valid action assigned")
    }

}