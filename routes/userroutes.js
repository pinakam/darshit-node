// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontrollers');

router.post('/users', userController.createuser);
router.get('/users', userController.readuser);
router.put('/users/:id', userController.updateuser);
router.delete('/users/:id', userController.deleteuser);

module.exports = router;
