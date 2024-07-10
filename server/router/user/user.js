const express = require('express')
const {postRegisterUser,LoginUser, updateUser, getAllUser, UpdatePassword, singleUser}=require('../../controllers/user/users')
const router=express.Router();

router.post('/register',postRegisterUser)
router.get('/',getAllUser)
router.get('/:id',singleUser)
router.post('/Login',LoginUser)
router.put('/:id',updateUser)
router.put('/password/:id',UpdatePassword)
module.exports=router
