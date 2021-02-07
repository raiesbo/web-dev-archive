const Project = require("../models/project");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: __dirname + '../.env' })



// const tokenVerification = (token) => {
//     // token = jwt
//     if (token) {
//         jwt.token(token, process.env.SIGNATURE, (err, decodedToken) => {
//             if (err) {
//                 console.log(err.message);
//                 return { error: err.message };
//             } else {
//                 return console.log(decodedToken);
//             }
//         })
//     } else {
//         return { error: "No token assigned" };
//     }

// }

/////////////////
// controllers //
/////////////////

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
    const { author } = req.params

    try {
        const projects = await Project.find({ author });
        res.send(projects)
    }
    catch (err) {
        res.status(400).send(err)
    }

}

module.exports.admin_post = async (req, res) => {
    const { action, token } = req.body;

    // console.log(token)
    // console.log(jwt)

    // const tokenAuth = tokenVerification(token)

    // if (tokenAuth.error) {
    //     res.status(400).send(tokenAuth.error)
    // }

    switch (action) {
        case "delete":
            const deleteId = req.body.id;
            const deletedProject = await Project.findByIdAndRemove(deleteId, { useFindAndModify: false });
            return res.status(200).send("the project has been deleted");
        case "update":
            const { updates, id } = req.body;
            const updatedProject = await Project.findByIdAndUpdate(id, updates, { useFindAndModify: false });
            console.log(updatedProject)
            return res.status(200).send(updatedProject);
        case "create":
            const { project } = req.body;
            const newProject = await Project.create({ ...project })
            console.log(newProject)
            return res.status(200).send(newProject)
        default:
            return res.status(400).send("no valid action assigned")
    }

}