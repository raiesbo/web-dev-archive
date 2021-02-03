const { Router } = require('express');
const { login_get, login_post, signup_get, signup_post } = require("../controlers/authControllers");



const router = Router();


router.get('/admin', login_get);
router.post('/admin', login_post);
router.get('/signup', signup_get);
router.post('/signup', signup_post);


module.exports = router;