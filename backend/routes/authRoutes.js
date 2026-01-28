const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');


const { handleValidation } = require('../middleware/handleSignupValidation');
const { validateLogin } = require('../middleware/validateLogin');
const { handleSignup, handleLogin, handleLogout } = require('../controller/userAuth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const name = file.originalname.split('.')[0];
        cb(null, name + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

router.post('/signup', upload.single('profile'), handleValidation, handleSignup)

router.post('/login', validateLogin, handleLogin)

router.get('/logout', handleLogout)

module.exports = router

