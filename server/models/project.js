const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    tags: {
        type: Array,
        default: []
    },
    links: {
        type: Object,
        default: {}
    },
    date: {
        type: String,
        default: ""
    },
    author: {
        type: String,
        default: ""
    }
})


const Project = mongoose.model("Project", projectSchema)


module.exports = Project;