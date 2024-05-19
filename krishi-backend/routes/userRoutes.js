const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const path = require('path')

var uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 }
});

//create new user with file upload
router.post('/create', uploader.fields([
    { name: 'panCard', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 }
  ]), userController.createUser);

  // get all users
  router.get('/views', userController.getAllUsers);

  // get user by id
  router.get('/views/:id', userController.getUserById);

  // delete user by id
  router.delete('/delete/:id', userController.deleteUserById);

  // update user by id
  router.put('/update/:id', uploader.fields([
    { name: 'panCard', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 }
  ]), userController.updateUserById);

  module.exports = router;