const zod = require('zod')

const adminUserValidation = zod.object({
    username : zod.string(),
    password : zod.string()
})

const courseValidation = zod.object({
    title : zod.string(),
    description : zod.string(),
    price: zod.number(),
    image: zod.string()
})

module.exports = {adminUserValidation,courseValidation}