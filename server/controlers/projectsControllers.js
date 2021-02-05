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

    res.send("admin_post")
}