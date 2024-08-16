const zod = require("zod");

const signupSchema = zod.object({
    firstName : zod.string({
        required_error : "firstname is required"
    }),
    lastName : zod.string(),
    username : zod.string(),
    password : zod.string()
})

const loginSchema = zod.object({
    username : zod.string(),
    password : zod.string()
})

const createBlogSchema = zod.object({
    title : zod.string(),
    content : zod.string()
})

const updateUserSchema = zod.object({
    firstName : zod.string().optional(),
    lastName : zod.string().optional(),
    username : zod.string().optional(),
    password : zod.string().optional()
})

const updateBlogSchema = zod.object({
    title : zod.string().optional(),
    content : zod.string().optional()
})

module.exports = {signupSchema, loginSchema, createBlogSchema, updateUserSchema, updateBlogSchema}