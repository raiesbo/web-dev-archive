const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    tags: {
        type: Array
    },
    links: {
        type: Object
    },
    year: {
        type: String
    }
})


const Project = mongoose.model("Project", projectSchema)


module.exports = Project;