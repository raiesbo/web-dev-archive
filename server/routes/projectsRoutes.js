const {Router} = require('express');
const {projects_get, admin_get, admin_post } = require("../controlers/projectsControllers");


const router = Router();


router.get("/projects", projects_get);
router.get("/admin/:author", admin_get);
router.post("/admin", admin_post);

module.exports = router;