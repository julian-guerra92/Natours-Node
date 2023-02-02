
const express = require('express');
const { createUsers, deleteUser, getAllUsers, getUserById, updateUser } = require('../controllers/userController');

const router = express.Router();


router.route('/')
   .get(getAllUsers)
   .post(createUsers);

router.route('/:id')
   .get(getUserById)
   .patch(updateUser)
   .delete(deleteUser);


module.exports = router;

