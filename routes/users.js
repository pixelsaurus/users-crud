var express = require('express');
var router = express.Router();
var user = require("../controllers/UserController.js");

// Get all users
router.get('/', user.list);

// Get single user by id
router.get('/view/:id', user.view);

// Create user
router.get('/create', user.create);

// Save user
router.post('/save', user.save);

// Edit user
router.get('/edit/:id', user.edit);

// Edit update
router.post('/update/:id', user.update);

// Edit update
router.post('/delete/:id', user.delete);

module.exports = router;
