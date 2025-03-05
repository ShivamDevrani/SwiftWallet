const { getAccountBalance, transferAmount } = require('../controller/account');
const { jwtAuthMiddleware } = require('../middleware/jwt');
const asyncHandler = require('../utils/asyncHandler');

const router=require('express').Router();

router.get('/balance',jwtAuthMiddleware,asyncHandler(getAccountBalance));

router.post('/transfer',jwtAuthMiddleware,transferAmount);

module.exports=router;