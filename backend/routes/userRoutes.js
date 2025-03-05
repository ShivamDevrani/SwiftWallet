const express = require('express');

const {jwtAuthMiddleware}=require('../middleware/jwt');

const router=express.Router();

const asyncHandler=require('../utils/asyncHandler');

const {signInHandler,signUpHandler,updateHandler, filterHandler}=require('../controller/user');

router.post('/signup',asyncHandler(signUpHandler));

router.post('/signin',asyncHandler(signInHandler));

router.put('/update',jwtAuthMiddleware,asyncHandler(updateHandler));

router.get('/bulk',jwtAuthMiddleware,asyncHandler(filterHandler));


module.exports=router;