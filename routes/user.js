const express = require('express')
const router = express.Router()

const {
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user_controllers')

router.get('/',getUser);

router.post('/',createUser);

router.put('/:id',updateUser);

router.delete('/',deleteUser);

module.exports = router