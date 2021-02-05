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
    const { action, id } = req.body;

    switch (action) {
        case "delete":
            const { id } = req.body;
            const deletedProject = await Project.findByIdAndRemove(id, { useFindAndModify: false });
            return res.status(200).send("the project has been deleted");
        case "update":
            const { updates } = req.body;
            const updatedProject = Project.findByIdAndUpdate({ _id: id, updates }, { useFindAndModify: false });
            return res.status(200).json(updatedProject);
        case "create":
            return res.status(200).send("you are creating")
        default:
            return res.status(400).send("no valid action assigned")
    }

}