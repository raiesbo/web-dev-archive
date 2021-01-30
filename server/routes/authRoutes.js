const { Router } = require('express');
const { admin_get, admin_post, signup_get, signup_post } = require("../controlers/authControllers");



const router = Router();


router.get('/admin', admin_get);
router.post('/admin', admin_post);
router.get('/signup', signup_get);
router.post('/signup', signup_post);


module.exports = router;