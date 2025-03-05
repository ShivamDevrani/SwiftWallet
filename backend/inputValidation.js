const zod=require('zod');


const signupSchema=zod.object({
    userName:zod.string().min(3).max(30),
    password:zod.string().min(6),
    firstName:zod.string().max(50),
    lastName:zod.string().max(50),
})

const updateSchema=zod.object({
    password:zod.string().min(6),
    firstName:zod.string().max(50),
    lastName:zod.string().max(50),
})

module.exports={signupSchema,updateSchema};